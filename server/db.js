import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  QueryCommand
} from '@aws-sdk/lib-dynamodb'

// AWS DynamoDB 配置
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

const docClient = DynamoDBDocumentClient.from(client)

const TABLE_NAME = 'MindfulMinds' // 表名
const PARTITION_KEY = 'Mindful Minds' // Partition Key 名稱

// 數據結構
// Partition Key: "Mindful Minds" (String) - 值為用戶名
// Sort Key: "dataType#id" (String) - 例如: "mood#1234567890" 或 "journal#1234567890"

/**
 * 獲取用戶的所有數據
 */
export async function getUserData(username) {
  try {
    const command = new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: '#pk = :username',
      ExpressionAttributeNames: {
        '#pk': PARTITION_KEY
      },
      ExpressionAttributeValues: {
        ':username': username
      }
    })

    const response = await docClient.send(command)
    return parseUserData(response.Items || [])
  } catch (error) {
    console.error('Error getting user data:', error)
    return {
      moodEntries: [],
      journalEntries: [],
      meditationLog: [],
      user: null
    }
  }
}

/**
 * 保存心情記錄
 */
export async function saveMoodEntry(username, entry) {
  try {
    const sortKey = `mood#${entry.id}`
    const item = {
      'sortKey': sortKey,
      dataType: 'mood',
      ...entry,
      createdAt: new Date().toISOString()
    }
    item[PARTITION_KEY] = username  // 使用括號語法設置帶空格的屬性名

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: item
    })

    await docClient.send(command)
    return { success: true }
  } catch (error) {
    console.error('Error saving mood entry:', error)
    throw error
  }
}

/**
 * 保存日記條目
 */
export async function saveJournalEntry(username, entry) {
  try {
    const sortKey = `journal#${entry.id}`
    const item = {
      'sortKey': sortKey,
      dataType: 'journal',
      ...entry,
      createdAt: new Date().toISOString()
    }
    item[PARTITION_KEY] = username  // 使用括號語法設置帶空格的屬性名

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: item
    })

    await docClient.send(command)
    return { success: true }
  } catch (error) {
    console.error('Error saving journal entry:', error)
    throw error
  }
}

/**
 * 保存冥想記錄
 */
export async function saveMeditationLog(username, log) {
  try {
    const logId = log.id || Date.now()
    const sortKey = `meditation#${logId}`
    const item = {
      'sortKey': sortKey,
      dataType: 'meditation',
      ...log,
      id: logId,
      createdAt: new Date().toISOString()
    }
    item[PARTITION_KEY] = username  // 使用括號語法設置帶空格的屬性名

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: item
    })

    await docClient.send(command)
    return { success: true }
  } catch (error) {
    console.error('Error saving meditation log:', error)
    throw error
  }
}

/**
 * 保存用戶信息
 */
export async function saveUser(username) {
  try {
    const sortKey = 'user#profile'
    const item = {
      'sortKey': sortKey,
      dataType: 'user',
      joinedDate: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
    item[PARTITION_KEY] = username  // 使用括號語法設置帶空格的屬性名

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: item
    })

    await docClient.send(command)
    return { success: true, username }
  } catch (error) {
    console.error('Error saving user:', error)
    throw error
  }
}

/**
 * 刪除條目（支持心情、日記等）
 */
export async function deleteEntry(username, dataType, id) {
  try {
    const { DeleteCommand } = await import('@aws-sdk/lib-dynamodb')
    const sortKey = `${dataType}#${id}`
    const key = {
      'sortKey': sortKey
    }
    key[PARTITION_KEY] = username  // 使用括號語法設置帶空格的屬性名

    const command = new DeleteCommand({
      TableName: TABLE_NAME,
      Key: key
    })

    await docClient.send(command)
    return { success: true }
  } catch (error) {
    console.error('Error deleting entry:', error)
    throw error
  }
}

/**
 * 獲取用戶的特定類型數據
 */
export async function getUserDataByType(username, dataType) {
  try {
    const command = new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: '#pk = :username AND begins_with(#sk, :prefix)',
      ExpressionAttributeNames: {
        '#pk': PARTITION_KEY,
        '#sk': 'sortKey'
      },
      ExpressionAttributeValues: {
        ':username': username,
        ':prefix': `${dataType}#`
      }
    })

    const response = await docClient.send(command)
    return response.Items || []
  } catch (error) {
    console.error(`Error getting ${dataType} data:`, error)
    return []
  }
}

/**
 * 解析用戶數據
 */
function parseUserData(items) {
  const data = {
    moodEntries: [],
    journalEntries: [],
    meditationLog: [],
    user: null
  }

  items.forEach(item => {
    switch (item.dataType) {
      case 'mood':
        data.moodEntries.push(item)
        break
      case 'journal':
        data.journalEntries.push(item)
        break
      case 'meditation':
        data.meditationLog.push(item)
        break
      case 'user':
        data.user = item
        break
    }
  })

  return data
}

export default {
  getUserData,
  getUserDataByType,
  saveMoodEntry,
  saveJournalEntry,
  saveMeditationLog,
  saveUser,
  deleteEntry
}
