const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Danh sách bài viết
router.get('/', async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render('index', { title: 'Danh sách blog', blogs });
});

// Form thêm blog
router.get('/add', (req, res) => {
    res.render('add-blog', { title: 'Thêm bài viết' });
});

// Xử lý thêm blog
router.post('/add', async (req, res) => {
    await Blog.create({ title: req.body.title, content: req.body.content });
    res.redirect('/blogs');
});

// Form sửa blog
router.get('/edit/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('edit-blog', { title: 'Chỉnh sửa blog', blog });
});

// Xử lý sửa blog
router.put('/edit/:id', async (req, res) => {
    await Blog.findByIdAndUpdate(req.params.id, { title: req.body.title, content: req.body.content });
    res.redirect('/blogs');
});

// Xóa blog
router.delete('/delete/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/blogs');
});

module.exports = router;
