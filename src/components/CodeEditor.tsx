'use client'

import { useEffect, useState, useCallback } from 'react'

type Token = { t: string; c: string }
type CodeLine = Token[]
type Char = { char: string; color: string }
type EditorPos = { line: number; tok: number; char: number; col: number }

const defaultPos = (): EditorPos => ({ line: 0, tok: 0, char: 0, col: 0 })

const TABS: { name: string; lang: string; color: string; lines: CodeLine[] }[] = [
  {
    name: 'App.tsx',
    lang: 'TypeScript React',
    color: '#80cbc4',
    lines: [
      [{ t: 'import', c: '#c792ea' }, { t: ' React ', c: '#cdd3de' }, { t: 'from', c: '#c792ea' }, { t: " 'react'", c: '#c3e88d' }],
      [{ t: 'import', c: '#c792ea' }, { t: ' { motion } ', c: '#cdd3de' }, { t: 'from', c: '#c792ea' }, { t: " 'framer-motion'", c: '#c3e88d' }],
      [],
      [{ t: 'export default ', c: '#c792ea' }, { t: 'function', c: '#82aaff' }, { t: ' App', c: '#ffcb6b' }, { t: '() {', c: '#cdd3de' }],
      [{ t: '  const ', c: '#c792ea' }, { t: '[count, setCount]', c: '#cdd3de' }, { t: ' = ', c: '#89ddff' }, { t: 'useState', c: '#82aaff' }, { t: '(', c: '#cdd3de' }, { t: '0', c: '#f78c6c' }, { t: ');', c: '#cdd3de' }],
      [],
      [{ t: '  return', c: '#c792ea' }, { t: ' (', c: '#cdd3de' }],
      [{ t: '    <', c: '#89ddff' }, { t: 'motion.div', c: '#f07178' }, { t: ' animate', c: '#ffcb6b' }, { t: '={{ opacity: ', c: '#cdd3de' }, { t: '1', c: '#f78c6c' }, { t: ' }}>', c: '#cdd3de' }],
      [{ t: '      <', c: '#89ddff' }, { t: 'button', c: '#f07178' }, { t: ' onClick', c: '#ffcb6b' }, { t: '={() => ', c: '#cdd3de' }, { t: 'setCount', c: '#82aaff' }, { t: '(c => c+', c: '#cdd3de' }, { t: '1', c: '#f78c6c' }, { t: ')>', c: '#cdd3de' }],
      [{ t: '        Count: ', c: '#cdd3de' }, { t: '{count}', c: '#89ddff' }],
      [{ t: '      </', c: '#89ddff' }, { t: 'button', c: '#f07178' }, { t: '>', c: '#89ddff' }],
      [{ t: '    </', c: '#89ddff' }, { t: 'motion.div', c: '#f07178' }, { t: '>', c: '#89ddff' }],
      [{ t: '  );', c: '#cdd3de' }],
      [{ t: '}', c: '#cdd3de' }],
    ],
  },
  {
    name: 'api/route.ts',
    lang: 'TypeScript',
    color: '#c792ea',
    lines: [
      [{ t: 'import', c: '#c792ea' }, { t: ' { NextRequest, NextResponse }', c: '#cdd3de' }, { t: ' from', c: '#c792ea' }, { t: " 'next/server'", c: '#c3e88d' }],
      [],
      [{ t: 'export async ', c: '#c792ea' }, { t: 'function', c: '#82aaff' }, { t: ' GET', c: '#ffcb6b' }, { t: '(req: ', c: '#cdd3de' }, { t: 'NextRequest', c: '#ffcb6b' }, { t: ') {', c: '#cdd3de' }],
      [{ t: '  const ', c: '#c792ea' }, { t: 'data', c: '#cdd3de' }, { t: ' = await ', c: '#89ddff' }, { t: 'fetchProjects', c: '#82aaff' }, { t: '()', c: '#cdd3de' }],
      [],
      [{ t: '  return ', c: '#c792ea' }, { t: 'NextResponse', c: '#ffcb6b' }, { t: '.', c: '#cdd3de' }, { t: 'json', c: '#82aaff' }, { t: '({ data, status: ', c: '#cdd3de' }, { t: '200', c: '#f78c6c' }, { t: ' })', c: '#cdd3de' }],
      [{ t: '}', c: '#cdd3de' }],
      [],
      [{ t: 'export async ', c: '#c792ea' }, { t: 'function', c: '#82aaff' }, { t: ' POST', c: '#ffcb6b' }, { t: '(req: ', c: '#cdd3de' }, { t: 'NextRequest', c: '#ffcb6b' }, { t: ') {', c: '#cdd3de' }],
      [{ t: '  const ', c: '#c792ea' }, { t: 'body', c: '#cdd3de' }, { t: ' = await ', c: '#89ddff' }, { t: 'req', c: '#f07178' }, { t: '.', c: '#cdd3de' }, { t: 'json', c: '#82aaff' }, { t: '()', c: '#cdd3de' }],
      [{ t: '  const ', c: '#c792ea' }, { t: 'result', c: '#cdd3de' }, { t: ' = await ', c: '#89ddff' }, { t: 'createProject', c: '#82aaff' }, { t: '(body)', c: '#cdd3de' }],
      [{ t: '  return ', c: '#c792ea' }, { t: 'NextResponse', c: '#ffcb6b' }, { t: '.', c: '#cdd3de' }, { t: 'json', c: '#82aaff' }, { t: '({ result }, { status: ', c: '#cdd3de' }, { t: '201', c: '#f78c6c' }, { t: ' })', c: '#cdd3de' }],
      [{ t: '}', c: '#cdd3de' }],
    ],
  },
  {
    name: 'schema.ts',
    lang: 'TypeScript / Zod',
    color: '#ffcb6b',
    lines: [
      [{ t: 'import', c: '#c792ea' }, { t: ' { z } ', c: '#cdd3de' }, { t: 'from', c: '#c792ea' }, { t: " 'zod'", c: '#c3e88d' }],
      [],
      [{ t: 'export const ', c: '#c792ea' }, { t: 'ProjectSchema', c: '#ffcb6b' }, { t: ' = ', c: '#89ddff' }, { t: 'z', c: '#82aaff' }, { t: '.', c: '#cdd3de' }, { t: 'object', c: '#82aaff' }, { t: '({', c: '#cdd3de' }],
      [{ t: '  id', c: '#f07178' }, { t: ': ', c: '#89ddff' }, { t: 'z', c: '#82aaff' }, { t: '.', c: '#cdd3de' }, { t: 'string', c: '#82aaff' }, { t: '().', c: '#cdd3de' }, { t: 'uuid', c: '#82aaff' }, { t: '(),', c: '#cdd3de' }],
      [{ t: '  title', c: '#f07178' }, { t: ': ', c: '#89ddff' }, { t: 'z', c: '#82aaff' }, { t: '.', c: '#cdd3de' }, { t: 'string', c: '#82aaff' }, { t: '().', c: '#cdd3de' }, { t: 'min', c: '#82aaff' }, { t: '(', c: '#cdd3de' }, { t: '1', c: '#f78c6c' }, { t: '),', c: '#cdd3de' }],
      [{ t: '  stack', c: '#f07178' }, { t: ': ', c: '#89ddff' }, { t: 'z', c: '#82aaff' }, { t: '.', c: '#cdd3de' }, { t: 'array', c: '#82aaff' }, { t: '(z.', c: '#cdd3de' }, { t: 'string', c: '#82aaff' }, { t: '()),', c: '#cdd3de' }],
      [{ t: '  live', c: '#f07178' }, { t: ': ', c: '#89ddff' }, { t: 'z', c: '#82aaff' }, { t: '.', c: '#cdd3de' }, { t: 'string', c: '#82aaff' }, { t: '().', c: '#cdd3de' }, { t: 'url', c: '#82aaff' }, { t: '().', c: '#cdd3de' }, { t: 'optional', c: '#82aaff' }, { t: '(),', c: '#cdd3de' }],
      [{ t: '  createdAt', c: '#f07178' }, { t: ': ', c: '#89ddff' }, { t: 'z', c: '#82aaff' }, { t: '.', c: '#cdd3de' }, { t: 'date', c: '#82aaff' }, { t: '(),', c: '#cdd3de' }],
      [{ t: '})', c: '#cdd3de' }],
      [],
      [{ t: 'export type ', c: '#c792ea' }, { t: 'Project', c: '#ffcb6b' }, { t: ' = z.', c: '#cdd3de' }, { t: 'infer', c: '#82aaff' }, { t: '<typeof ', c: '#cdd3de' }, { t: 'ProjectSchema', c: '#ffcb6b' }, { t: '>', c: '#cdd3de' }],
    ],
  },
]

export default function CodeEditor() {
  const [activeTab, setActiveTab] = useState(0)
  const [tabStates, setTabStates] = useState(
    TABS.map(() => ({ lines: [] as Char[][], pos: defaultPos(), done: false }))
  )
  const [fading, setFading] = useState(false)
  const [cursor, setCursor] = useState(true)

  // Cursor blink
  useEffect(() => {
    const b = setInterval(() => setCursor(v => !v), 530)
    return () => clearInterval(b)
  }, [])

  // Switch tab with fade
  const switchTab = useCallback((idx: number) => {
    if (idx === activeTab) return
    setFading(true)
    setTimeout(() => {
      setActiveTab(idx)
      setFading(false)
    }, 160)
  }, [activeTab])

  // Typewriter per active tab
  useEffect(() => {
    const state = tabStates[activeTab]
    if (state.done || fading) return

    const codeLines = TABS[activeTab].lines
    const { line, tok, char, col } = state.pos

    const timer = setTimeout(() => {
      const row = codeLines[line]

      // Write one char
      setTabStates(prev => {
        const next = prev.map(s => ({ ...s, lines: s.lines.map(l => [...l]) }))
        const s = next[activeTab]
        if (!s.lines[line]) s.lines[line] = []
        if (row && row.length && tok < row.length) {
          s.lines[line] = [...s.lines[line], { char: row[tok].t[char], color: row[tok].c }]
        }
        return next
      })

      // Advance
      const goNext = (nextLine: number) => {
        if (nextLine < codeLines.length) {
          setTabStates(prev => {
            const next = [...prev]
            next[activeTab] = { ...next[activeTab], pos: { line: nextLine, tok: 0, char: 0, col: 0 } }
            return next
          })
        } else {
          setTabStates(prev => {
            const next = [...prev]
            next[activeTab] = { ...next[activeTab], done: true }
            return next
          })
        }
      }

      if (!row || !row.length) { goNext(line + 1); return }

      const token = row[tok]
      if (char + 1 < token.t.length) {
        setTabStates(prev => {
          const next = [...prev]
          next[activeTab] = { ...next[activeTab], pos: { line, tok, char: char + 1, col: col + 1 } }
          return next
        })
      } else if (tok + 1 < row.length) {
        setTabStates(prev => {
          const next = [...prev]
          next[activeTab] = { ...next[activeTab], pos: { line, tok: tok + 1, char: 0, col: col + 1 } }
          return next
        })
      } else {
        goNext(line + 1)
      }
    }, 34)

    return () => clearTimeout(timer)
  }, [tabStates, activeTab, fading])

  const replay = () => {
    setTabStates(prev => {
      const next = [...prev]
      next[activeTab] = { lines: [], pos: defaultPos(), done: false }
      return next
    })
  }

  const state = tabStates[activeTab]
  const codeLines = TABS[activeTab].lines
  const tabColor = TABS[activeTab].color

  return (
    <div style={{
      fontFamily: "'JetBrains Mono','Fira Code','Cascadia Code',monospace",
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: `0 0 0 1px rgba(255,255,255,0.07), 0 32px 64px rgba(0,0,0,0.55), 0 0 60px ${tabColor}12`,
      transition: 'box-shadow 0.4s',
    }}>

      {/* Title bar */}
      <div style={{
        background: 'linear-gradient(180deg, #1a1c2e 0%, #161828 100%)',
        padding: '11px 16px 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          {(['#ff5f57','#febc2e','#28c840'] as const).map((bg, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: bg, boxShadow: `0 0 6px ${bg}90` }} />
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 2 }}>
          {TABS.map((tab, i) => {
            const isActive = i === activeTab
            return (
              <button
                key={tab.name}
                onClick={() => switchTab(i)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '7px 14px 10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 12.5,
                  fontFamily: 'inherit',
                  letterSpacing: '0.02em',
                  borderRadius: '8px 8px 0 0',
                  background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
                  color: isActive ? tab.color : '#3d4166',
                  outline: 'none',
                  transition: 'color 0.2s, background 0.2s',
                }}
              >
                {/* Dot indicator */}
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  flexShrink: 0,
                  background: isActive ? tab.color : '#252840',
                  boxShadow: isActive ? `0 0 7px ${tab.color}` : 'none',
                  transition: 'all 0.25s',
                }} />
                {tab.name}
                {/* Active underline */}
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0, left: 12, right: 12,
                    height: 2,
                    borderRadius: '2px 2px 0 0',
                    background: tab.color,
                    boxShadow: `0 0 8px ${tab.color}`,
                  }} />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Code area */}
      <div style={{
        background: '#1a1c2e',
        minHeight: 310,
        padding: '18px 0 14px',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.16s ease',
      }}>
        {codeLines.map((_, li) => {
          const chars: Char[] = state.lines[li] || []
          const isCurrent = li === state.pos.line && !state.done
          return (
            <div key={li} style={{ display: 'flex', alignItems: 'center', minHeight: 22, padding: '1px 0' }}>
              <div style={{
                width: 44, textAlign: 'right', paddingRight: 18,
                fontSize: 11.5, userSelect: 'none', flexShrink: 0,
                color: li < state.pos.line || state.done ? '#3d4166' : isCurrent ? '#5560a0' : '#252840',
                transition: 'color 0.3s',
              }}>
                {li + 1}
              </div>
              <div style={{ fontSize: 13.5, lineHeight: '22px', letterSpacing: '0.025em' }}>
                {chars.map((ch, ci) => (
                  <span key={ci} style={{ color: ch.color }}>
                    {ch.char === ' ' ? '\u00A0' : ch.char}
                  </span>
                ))}
                {isCurrent && (
                  <span style={{
                    display: 'inline-block',
                    width: 2, height: '0.85em',
                    background: tabColor,
                    boxShadow: `0 0 8px ${tabColor}, 0 0 20px ${tabColor}50`,
                    opacity: cursor ? 1 : 0,
                    verticalAlign: 'middle',
                    marginLeft: 1,
                    transition: 'opacity 0.1s',
                    borderRadius: 1,
                  }} />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Status bar */}
      <div style={{
        background: 'linear-gradient(180deg, #161828 0%, #13141f 100%)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '7px 18px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 7, height: 7, borderRadius: '50%',
            background: state.done ? '#28c840' : tabColor,
            boxShadow: state.done ? '0 0 6px #28c840' : `0 0 6px ${tabColor}`,
            transition: 'all 0.3s',
          }} />
          <span style={{ fontSize: 11, color: '#4e5474' }}>
            Ln {state.pos.line + 1},&nbsp;Col {state.pos.col + 1}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontSize: 11, color: tabColor,
            background: `${tabColor}18`,
            padding: '2px 9px', borderRadius: 5,
            letterSpacing: '0.03em',
          }}>
            {TABS[activeTab].lang}
          </span>
          <span style={{ fontSize: 11, color: '#3d4166' }}>UTF-8</span>
          {state.done && (
            <button onClick={replay} style={{
              fontSize: 11, cursor: 'pointer',
              color: tabColor,
              background: `${tabColor}18`,
              border: `1px solid ${tabColor}30`,
              borderRadius: 5, padding: '2px 10px',
              fontFamily: 'inherit',
            }}>↺ Replay</button>
          )}
        </div>
      </div>
    </div>
  )
}