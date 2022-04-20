export function fileTypeMiddleware(req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const types = ['image/png', 'image/jpeg', 'image/jpg']
        const file = req.files.file
        if (!types.includes(file.mimetype)) {
            return res.status(401).json({message: 'Недопустимый формат файла'})
        }
        return next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: 'Ошибка'})
    }
}