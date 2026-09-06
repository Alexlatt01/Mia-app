import Dexie from 'dexie';

export const db = new Dexie('DashProDB');
db.version(1).stores({
  activities: '++id, date',
  finance: '++id, date',
  studySessions: '++id, date',
  aiChats: '++id, timestamp',
  notifications: '++id, timestamp',
  userPreferences: 'key',
});

export async function addActivity(activity) {
  return db.activities.add({
    ...activity,
    date: new Date().toISOString(),
  });
}

export async function getActivities(days = 7) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  const sinceStr = since.toISOString();
  const allData = await db.activities.toArray();
  return allData.filter(item => item.date >= sinceStr);
}

export async function addFinanceEntry(entry) {
  return db.finance.add({
    ...entry,
    date: new Date().toISOString(),
  });
}

export async function getFinanceData(days = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  const sinceStr = since.toISOString();
  const allData = await db.finance.toArray();
  return allData.filter(item => item.date >= sinceStr);
}

export async function addStudySession(session) {
  return db.studySessions.add({
    ...session,
    date: new Date().toISOString(),
  });
}

export async function getStudyData(days = 7) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  const sinceStr = since.toISOString();
  const allData = await db.studySessions.toArray();
  return allData.filter(item => item.date >= sinceStr);
}

export async function addAIChat(message, response) {
  return db.aiChats.add({
    message,
    response,
    timestamp: new Date().toISOString(),
  });
}

export async function getAIChats(limit = 50) {
  return db.aiChats
    .orderBy('timestamp')
    .reverse()
    .limit(limit)
    .toArray();
}

export async function addNotification(notification) {
  return db.notifications.add({
    ...notification,
    timestamp: new Date().toISOString(),
    read: false,
  });
}

export async function getUnreadNotifications() {
  const allNotifications = await db.notifications.toArray();
  return allNotifications.filter(notif => notif.read === false);
}

export async function markNotificationAsRead(id) {
  return db.notifications.update(id, { read: true });
}

export async function setUserPreference(key, value) {
  return db.userPreferences.put({ key, value });
}

export async function getUserPreference(key) {
  const pref = await db.userPreferences.get(key);
  return pref?.value || null;
}

export async function clearAllData() {
  await db.activities.clear();
  await db.finance.clear();
  await db.studySessions.clear();
  await db.aiChats.clear();
  await db.notifications.clear();
}
