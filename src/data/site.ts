const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME

export const GITHUB_URL: string | null = username ? `https://github.com/${username}` : null
export const EMAIL = 'jeerapat.kah@gmail.com'
export const CV_PATH = '/cv.pdf'
