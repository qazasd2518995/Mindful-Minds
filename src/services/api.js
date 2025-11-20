// API 服務層 - 處理所有與後端的通信

const API_BASE = '/api'

/**
 * 通用 fetch 包裝器
 */
async function fetchAPI(url, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// ============ User API ============

export async function registerUser(username) {
  return fetchAPI('/user', {
    method: 'POST',
    body: JSON.stringify({ username }),
  })
}

export async function getUserData(username) {
  return fetchAPI(`/user/${username}`)
}

// ============ Mood API ============

export async function getMoodEntries(username) {
  return fetchAPI(`/mood/${username}`)
}

export async function saveMoodEntry(username, entry) {
  return fetchAPI('/mood', {
    method: 'POST',
    body: JSON.stringify({ username, entry }),
  })
}

export async function deleteMoodEntry(username, id) {
  return fetchAPI(`/mood/${username}/${id}`, {
    method: 'DELETE',
  })
}

// ============ Journal API ============

export async function getJournalEntries(username) {
  return fetchAPI(`/journal/${username}`)
}

export async function saveJournalEntry(username, entry) {
  return fetchAPI('/journal', {
    method: 'POST',
    body: JSON.stringify({ username, entry }),
  })
}

export async function deleteJournalEntry(username, id) {
  return fetchAPI(`/journal/${username}/${id}`, {
    method: 'DELETE',
  })
}

// ============ Meditation API ============

export async function getMeditationLogs(username) {
  return fetchAPI(`/meditation/${username}`)
}

export async function saveMeditationLog(username, log) {
  return fetchAPI('/meditation', {
    method: 'POST',
    body: JSON.stringify({ username, log }),
  })
}

// ============ Chat API ============

export async function sendChatMessage(messages) {
  return fetchAPI('/chat', {
    method: 'POST',
    body: JSON.stringify({ messages }),
  })
}

export default {
  registerUser,
  getUserData,
  getMoodEntries,
  saveMoodEntry,
  deleteMoodEntry,
  getJournalEntries,
  saveJournalEntry,
  deleteJournalEntry,
  getMeditationLogs,
  saveMeditationLog,
  sendChatMessage,
}
