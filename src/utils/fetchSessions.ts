import sessions from '@/assets/sessions.json'
import { Session } from '@/types/Session'

let shouldFailNext = false


export function triggerNextError() {
  shouldFailNext = true
}


export async function fetchSessions(): Promise<Session[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFailNext) {
        shouldFailNext = false
        reject(new Error('Failed to load sessions'))
        return
      }
      resolve(sessions)
    }, 500)
  })
}
