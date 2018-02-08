function hashParams(query) {
    if(/^#/.test(query)) {
        query = query.substring(1)
    }
    const params = {}
    for(let pair of query.split('&')) {
      const [lv, rv] = pair.split('=')
      if(lv == null)
        continue
  
      params[decodeURIComponent(lv)] = rv == null ? rv : decodeURIComponent(rv)
    }
    return params
  }