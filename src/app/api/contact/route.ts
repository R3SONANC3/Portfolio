import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)
const MAX_BODY_SIZE = 10_000
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 4
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

type ContactPayload = { name?: unknown; email?: unknown; subject?: unknown; message?: unknown }

const respond = (body: Record<string, unknown>, status = 200, headers?: HeadersInit) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store, max-age=0', ...headers } })
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character] ?? character))

function getClientIp(request: NextRequest) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? request.headers.get('x-real-ip') ?? 'unknown'
}

function isAllowedOrigin(request: NextRequest) {
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  if (!origin || !host) return true
  try { return new URL(origin).host === host } catch { return false }
}

function isRateLimited(ip: string) {
  const now = Date.now()
  for (const [key, value] of rateLimitStore) if (value.resetAt <= now) rateLimitStore.delete(key)
  const record = rateLimitStore.get(ip)
  if (!record) { rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS }); return false }
  record.count += 1
  return record.count > RATE_LIMIT_MAX_REQUESTS
}

function validatePayload(payload: ContactPayload) {
  const { name: rawName, email: rawEmail, subject: rawSubject, message: rawMessage } = payload
  if (typeof rawName !== 'string' || typeof rawEmail !== 'string' || typeof rawSubject !== 'string' || typeof rawMessage !== 'string') return null
  const name = rawName.trim()
  const email = rawEmail.trim().toLowerCase()
  const subject = rawSubject.trim()
  const message = rawMessage.trim()
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!name || !subject || !message || !validEmail || name.length > 100 || email.length > 254 || subject.length > 180 || message.length > 5_000) return null
  return { name, email, subject, message }
}

export function GET() { return respond({ error: 'Method not allowed.' }, 405, { Allow: 'POST' }) }

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()
  if (!isAllowedOrigin(request)) return respond({ error: 'Request origin is not allowed.' }, 403)
  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) return respond({ error: 'Unsupported content type.' }, 415)
  const declaredLength = Number(request.headers.get('content-length') ?? 0)
  if (declaredLength > MAX_BODY_SIZE) return respond({ error: 'Message is too large.' }, 413)
  if (isRateLimited(getClientIp(request))) return respond({ error: 'Too many requests. Please try again shortly.' }, 429, { 'Retry-After': '60' })

  let payload: ContactPayload
  try {
    const body = await request.text()
    if (body.length > MAX_BODY_SIZE) return respond({ error: 'Message is too large.' }, 413)
    payload = JSON.parse(body) as ContactPayload
  } catch {
    return respond({ error: 'Please send a valid message.' }, 400)
  }

  const contact = validatePayload(payload)
  if (!contact) return respond({ error: 'Please provide valid contact details.' }, 400)
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    console.error(`[contact:${requestId}] email service is not configured`)
    return respond({ error: 'The contact service is temporarily unavailable.' }, 503)
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <noreply@pakkard.xyz>',
      to: [process.env.CONTACT_EMAIL],
      replyTo: contact.email,
      subject: `[Portfolio] ${contact.subject}`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:auto"><h1>New message from portfolio</h1><p><strong>From:</strong> ${escapeHtml(contact.name)}</p><p><strong>Email:</strong> ${escapeHtml(contact.email)}</p><p><strong>Subject:</strong> ${escapeHtml(contact.subject)}</p><hr /><p style="white-space:pre-wrap">${escapeHtml(contact.message)}</p></div>`,
    })
    if (error) throw new Error(error.message)
    return respond({ success: true })
  } catch (error) {
    console.error(`[contact:${requestId}] delivery failed`, error)
    return respond({ error: 'Unable to send your message right now. Please try again later.' }, 502)
  }
}
