
function handleResponse (response) {
  let contentType = response.headers.get('content-type')
  if (contentType.includes('application/json')) {
    return handleJSONResponse(response)
  } else if (contentType.includes('text/html')) {
    return handleTextResponse(response)
  } else {
    throw new Error(`Sorry, content-type ${contentType} not supported`)
  }
}

function handleJSONResponse (response) {
  return response.json()
    .then(json => {
      if (response.ok) {
        return json
      } else {
        return Promise.reject(Object.assign({}, json, {
          status: response.status,
          statusText: response.statusText
        }))
      }
    })
}
function handleTextResponse (response) {
  return response.text()
    .then(text => {
      if (response.ok) {
        return json
      } else {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          err: text
        })
      }
    })
}

const __ = {}

// 原生fetch请求
__.fetch = function (url, opts) {
	return fetch(url, opts).then(handleResponse)
}

// Promise ajax
__.ajax = function (url, {method, body}) {
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest()
		request.open(method, url)
		request.onreadystatechange = function() {
			if (request.readyState === 4) {
				if(request.status === 200){
					resolve(JSON.parse(request.responseText))
			    } else {
			    	reject(JSON.parse(request.responseText))
			    }
			}
		}
		request.send(body)
	})
}

// ajax请求
__.ajax2 = function (url, {method, body}) {
	return {
		fetch: function (success, error) {
			let request = new XMLHttpRequest()
			request.open(method, url)
			request.onreadystatechange = function() {
				if (request.readyState === 4) {
					console.log(request)
					if(request.status === 200){
						success(JSON.parse(request.responseText))
				    } else {
				    	error(request.responseText)
				    }
				}
			}
			request.send(body)
		}
	}
}




