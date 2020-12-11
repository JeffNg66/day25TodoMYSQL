// load modules
const express = require('express'),
      bodyParser = require('body-parser'),
      secureEnv = require('secure-env'),
      cors = require('cors'),
      mysql = require('mysql2/promise')

// create instance of express
const app = express()

// configure environment
app.use(cors())
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.json({limit: '50mb'}))

global.env = secureEnv({secret:'isasecret'})
const PORT = global.env.PORT

// configure database pool
const pool = mysql.createPool({
    host: global.env.MYSQL_SERVER,
    port: global.env.MYSQL_PORT,
    user: global.env.MYSQL_USERNAME,
    password: global.env.MYSQL_PASSWORD,
    database: global.env.MYSQL_DATABASE,
    connectionLimit: global.env.MYSQL_CONNECTION
})

const startApp = async (app, pool) => {
	const conn = await pool.getConnection()
	try {
		console.info('Pinging database...')
		await conn.ping()
		app.listen(PORT, () => {
			console.info(`Application started on port ${PORT} at ${new Date()}`)
		})
	} catch(e) {
        console.error('Cannot ping database', e);
    } finally {
		conn.release()
	}
}

// setup SQL statement
const listOfTasks = `select t.*, count(td.task_id) as count 
                    from tasks as t
                    left join todolist as td using (task_id)
                    group by t.task_id, t.name`
const singleTask = `select t.name, t.priority, t.due_date, 
                       td.todoname, td.status from tasks t 
                       left join todolist td using (task_id) 
                       where t.task_id = ?`
const delTask = `delete from tasks where task_id = ?`

// make SQL function using closure function
const makeQuery = (sql, pool) => {
    return (async (args) => {
        const conn = await pool.getConnection();
        try {
            let results = await conn.query(sql, args || [])
            return results[0]
        } catch (err) {
            console.error(err)
        } finally {
            conn.release()
        }
    })
}

const getTaskList = makeQuery(listOfTasks, pool)
const getSingleTask = makeQuery(singleTask, pool)
const delSingleTask = makeQuery(delTask, pool)
// 
app.get("/tasks", (req, res) => {
    getTaskList()
        .then( results => {
            res.status(200).json(results)
        })
        .catch( err => {
            console.error(err)
            res.status(500).end()
    })
})

app.get("/tasks/:id", (req, res) => {
    // console.info('params >',req.params)
    getSingleTask(req.params.id, res)
        .then( results => {
            res.status(200).json(results)
        })
        .catch( err => {
            console.error(err)
            res.status(500).end()
    })
})

app.delete("/del/:id", (req, res) => {
    // console.info('params >',req.params)
    delSingleTask(req.params.id, res)
        .then( results => {
            res.status(200).json(results)
        })
        .catch( err => {
            console.error(err)
            res.status(500).end()
    })
})
// app.post("/api/rsvps", (req, res) => {
//     saveRsvp([req.body.name, req.body.email, req.body.phone, req.body.status, 1])
//         .then( result => {
//             res.status(200).json(result)
//         })
//         .catch( err => {
//             console.error(err)
//             res.status(500).json(err)
//         })
// })

// start PORT listening
startApp(app, pool);

