
const Database = require('./db')
const createProffy = require('./createProffy')

Database.then( async (db) => {
    // INSERIR DADOS INSERIDOS
    proffyValue = {
        name: "Dayana Toledo",
        avatar: "https://d.wattpad.com/story_parts/91/images/140e5232b7c1a1bb.jpg",
        whatsapp: "14998562358",
        bio: "Instrutora de assistir doramas e animes",
    }

    classValue = {
        subject: "1",
        cost: "20",
        // proffy_id vai vir pelo banco
    }

    classScheduleValues = [
        // class_id vai vir pelo banco
        {
            weekday: 1,
            time_from: 1220,
            time_to: 720
        },
        {
            weekday: 0,
            time_from: 5020,
            time_to: 1220
        }
    ]

    // manda os objetos para a função que insere no banco
    await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // CONSULTAR DADOS INSERIDOS

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")

    // as aulas de um determinado proffy e seus dados
    const selectedClassesAndProffy = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)

    // para filtrar o horário, o valor passado como pesquisa tem que estar entre o time_from e o time_to, ou seja, time_from <= pesquisa <= time_to
    const selectedClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1" 
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to >= "520"
    `)
    
})
