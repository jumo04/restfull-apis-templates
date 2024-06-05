import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'moviesdb'
};

const connection =  await mysql.createConnection(config);

export class MovieModel {
    static async getAll({ genre }) {
        const result = [];
        const [movies] = await connection.query(`SELECT title, year, director, poster, rate, BIN_TO_UUID(id) id FROM movie`);
        if (genre) {
            const lower = genre.toLowerCase();
            const [genres] = await connection.query(`SELECT * FROM genre WHERE LOWER(name) = ?;`, [lower]);
            if (genres.length === 0) {
                return []
            }
            const [{ id }] = genres;
            const [moviesgnr] = await connection.query(`SELECT BIN_TO_UUID(movie_id) movie_id, genre_id FROM movie_genres WHERE genre_id = ?;`, [id] );
            for (let index = 0; index < moviesgnr.length; index++) {
                const [[element]] = await connection.query(`SELECT title, year, director, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE  BIN_TO_UUID(id) = ?;`, [moviesgnr[index].movie_id]);
                result.push(element);
            }
            return result;
        }
        return movies;
    }

    static async getById({ id }) {
        const [[movie]] = await connection.query(`SELECT title, year, director, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE BIN_TO_UUID(id) = ?;`, [id]);
        if (!movie) {
            return null;
        }
        return movie;
    }
    static async create({ input }) {
        const {
            genre: genreInput,
            title,
            year,
            director,
            duration,
            poster,
            rate
        } = input;

        const [uuidResult] = await connection.query('SELECT UUID() uuid;');
        const [{ uuid }] = uuidResult;

        try {
            await connection.query(`INSERT INTO movie(id, title, year, director, duration, poster, rate) VALUES
            (UUID_TO_BIN(?),?, ?, ?, ?, ?, ?);`, [uuid, title, year, director, duration, poster, rate]);
            const [[movie]] = await connection.query(`SELECT title, year, director, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE BIN_TO_UUID(id) = ?;`, [uuid]);
            return movie;
        }catch (error) {
            //puede enviar informacion sensible]
            throw new Error("Error creating movie");
            //enviar la traza a un servicio interno
        }

        
   }
    static async delete({ id }) {
        //crear el delete
    }
    static async update({ id, input }) {
        //crear el update
    }
}