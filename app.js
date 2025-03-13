require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));

// Cấu hình middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(expressLayouts);
app.set('layout', 'layouts/main'); // Default layout file (optional)
app.set('view engine', 'ejs');

// Import Routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/blogs', blogRoutes);

// Trang chủ
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
  });
  
// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));
