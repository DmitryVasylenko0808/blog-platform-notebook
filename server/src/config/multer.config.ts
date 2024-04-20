import { diskStorage } from "multer";
import { extname } from "path";
import { v4 } from "uuid";

export const avatarsStorage = diskStorage({
    destination: "./uploads/avatars",
    filename(req, file, callback) {
        callback(null, generateFilename(file));
    },
});

export const postsStorage = diskStorage({
    destination: "./uploads/posts",
    filename(req, file, callback) {
        callback(null, generateFilename(file));
    },
});

const generateFilename = (file: Express.Multer.File) => {
    const name = `${v4()}${extname(file.originalname)}`;

    return name;
<<<<<<< HEAD
};

var q= 1;
=======
};
>>>>>>> fae7f3bdb489e3d0e076ecec5fe248916df14e9e
