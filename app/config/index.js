module.exports = {
	DB_URL: 'mongodb://localhost:27017/ipet',
	COOKIE_SECRET: 'secret_123456',
	COOKIE_NAME: 'connect.sid',
	COOKIE_MAXAGE: 1000 * 60 * 30,
	STATIC_PATH: '/static',
	PET_CATEGORY: [
		{
			label: '喵喵',
			value: 'mm',
			variety: [
				{
					label: '英短',
					value: 'yd'
				},
				{
					label: '美短',
					value: 'md',
					active: true
				},
				{
					label: '布偶',
					value: 'bo'
				},
				{
					label: '中华田园',
					value: 'tm'
				},
				{
					label: '串串',
					value: 'cc'
				}
			]
		}, 
		{
			label: '汪汪',
			value: 'ww',
			active: true,
			variety: [
				{
					label: '柯基',
					value: 'kj'
				},
				{
					label: '泰迪',
					value: 'td',
					active: true
				},
				{
					label: '金毛',
					value: 'jm'
				},
				{
					label: '中华田园',
					value: 'tg'
				},
				{
					label: '串串',
					value: 'cc'
				}
			]
		}
	]
};