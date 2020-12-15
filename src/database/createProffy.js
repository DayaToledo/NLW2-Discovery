module.exports = async function(db, {proffyValue, classValue, classScheduleValues}){
    // inserir dados na tabela proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `) 
    const proffy_id = insertedProffy.lastID

    // inserir dados na tabela classes
    const insertedClassValue = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)
    const class_id = insertedClassValue.lastID

    // inserir dados na tabela class_schedules
    // insertedAllClassShedulesValues no final, vai conter um array de db.runs, que serão executados todos ao mesmo tempo depois
    const insertedAllClassShedulesValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                weekday,
                time_to,
                time_from,
                class_id
            ) VALUES (
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_to}",
                "${classScheduleValue.time_from}",
                "${class_id}"
            );
        `)
    })
    // execução dos db.runs do array insertedAllClassShedulesValues
    await Promise.all(insertedAllClassShedulesValues)
}