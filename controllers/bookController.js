const { Book, Author } = require('../model/model');

const bookController = {
	// ADD A BOOK
	addABook: async (req, res) => {
		try {
			const newBook = new Book(req.body);
			const savedBook = await newBook.save();
			if (req.body.author) {
				const author = Author.findById(req.body.author);
				await author.updateOne({ $push: { books: savedBook._id } });
			}
			res.status(200).json(savedBook);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	getAllBook: async (req, res) => {
		try {
			const PAGE_SIZE = 2;
			const page = req.query.page;
			if (page) {
				var skip = (page - 1) * PAGE_SIZE;
				const allBook = await Book.find().skip(skip).limit(PAGE_SIZE);
				res.status(200).json(allBook);
			} else {
				const allBooks = await Book.find();
				res.status(200).json(allBooks);
			}
		} catch (err) {
			res.status(500), json(err);
		}
	},
	getAnBook: async (req, res) => {
		try {
			const book = await (
				await Book.findById(req.params.id)
			).populate('author');
			res.status(200).json(book);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	updateBook: async (req, res) => {
		try {
			const book = await Book.findById(req.params.id);
			await book.updateOne({ $set: req.body });
			res.status(200).json('updated successfully');
		} catch (err) {
			res.status(500).json(err);
		}
	},
	deleteBook: async (req, res) => {
		try {
			await Author.updateMany(
				{ books: req.params.id },
				{ $pull: { books: req.params.id } }
			);
			await Book.findByIdAndDelete(req.params.id);
			res.status(200).json('deleted successfully');
		} catch (err) {
			res.status(500).json(err);
		}
	}
};

module.exports = bookController;
