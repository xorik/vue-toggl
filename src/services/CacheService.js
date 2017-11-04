import * as moment from 'moment/moment'

class CacheService {
  set (key, value, ttl) {
    const data = [
      value,
      moment().add(ttl, 'seconds').toISOString()
    ]

    localStorage.setItem(key, JSON.stringify(data))
  }

  get (key) {
    const stored = localStorage.getItem(key)
    if (stored !== null) {
      const data = JSON.parse(stored)

      // TTL is not expired
      if (moment().isBefore(data[1])) {
        return data[0]
      } else {
        localStorage.removeItem(key)
      }
    }

    return null
  }

  getPromise (key) {
    return new Promise((resolve, reject) => {
      const data = this.get(key)

      if (data === null) {
        reject(new Error('Cache expired'))
        return
      }

      resolve(data)
    })
  }
}

export default new CacheService()
