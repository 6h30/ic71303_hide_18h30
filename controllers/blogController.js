'use strict';

const models = require('../models');
const controller = {};

// controller.showArticle = async (req, res) => {
//     const articleId = req.params.id; // Lấy ID bài viết từ tham số URL

//     try {
//         // Tìm bài viết trong cơ sở dữ liệu
//         const article = await models.Post.findByPk(articleId, {
//             include: [
//                 { model: models.Category, through: { attributes: [] } }, // Lấy danh mục 
//                 { model: models.Comment, as: 'comments' }, // Lấy bình luận
//                 { model: models.Author, as: 'author' } // Lấy thông tin tác giả
//             ]
//         });

//         // Kiểm tra xem bài viết có tồn tại không
//         if (!article) {
//             return res.status(404).json({ message: 'Article not found' });
//         }

//         // Trả về bài viết
//         return res.status(200).json(article);
//     } catch (error) {
//         // Xử lý lỗi
//         console.error(error);
//         return res.status(500).json({ message: 'An error occurred while fetching the article' });
//     }
// };

// Lấy danh sách bài viết
controller.getPosts = async (req, res) => {
    try {
        const posts = await models.Post.findAll({
            include: [
                { model: models.Author, as: 'author', attributes: ['author_id'] }, // Bao gồm thông tin tác giả
                { model: models.Comment, as: 'comments', attributes: ['comment_id'] }, // Bao gồm bình luận nếu cần
                { model: models.Category, as: 'categories', attributes: ['name'] },
                { model: models.PostCategory, as: 'postCategories', attributes: ['category_id'] }
            ],
            attributes: [
                'post_id', 'title', 'description', 'slug', 'content', 'image', 'author_id', 'createdAt', 'updatedAt',
                'seo', 'metaTitle', 'metaDescription', 'metaImage', 'keywords', 'metaRobots', 'structuredData',
                'metaViewport', 'canonicalURL'
            ]
        });

        // Chuyển đổi dữ liệu thành định dạng yêu cầu
        const formattedPosts = posts.map(post => ({
            post_id: post.post_id,
            seo: post.seo,
            metaTitle: post.metaTitle,
            metaDescription: post.metaDescription,
            metaImage: post.metaImage,
            keywords: post.keywords,
            metaRobots: post.metaRobots,
            structuredData: post.structuredData,
            metaViewport: post.metaViewport,
            canonicalURL: post.canonicalURL,
            title: post.title,
            description: post.description,
            slug: post.slug,
            content: post.content,
            image: post.image,
            author_id: post.author_id,
            category_name: post.name,
            category_id: post.category_id,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
        }));

        const response = {
            data: formattedPosts,
            meta: {
                pagination: {
                    page: 1, // Có thể thêm logic phân trang nếu cần
                    pageSize: posts.length,
                    pageCount: 1,
                    total: posts.length
                }
            }
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching posts:', error); 
        return res.status(500).json({ message: 'An error occurred while fetching posts', error: error.message });
    }
    
};


// Tạo bài viết mới
controller.createPost = async (req, res) => {
    const { title, content, authorId } = req.body; // Lấy dữ liệu từ body

    try {
        const newPost = await models.Post.create({ title, content, authorId });
        return res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while creating the post' });
    }
};

// Lấy một bài viết cụ thể
controller.getPostById = async (req, res) => {
    const postId = req.params.documentId; // Lấy ID bài viết từ tham số URL

    try {
        const post = await models.Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while fetching the post' });
    }
};

// Cập nhật bài viết
controller.updatePost = async (req, res) => {
    const postId = req.params.documentId; // Lấy ID bài viết từ tham số URL
    const { title, content } = req.body; // Lấy dữ liệu từ body

    try {
        const post = await models.Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Cập nhật thông tin bài viết
        post.title = title;
        post.content = content;
        await post.save();

        return res.status(200).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while updating the post' });
    }
};

// Xóa bài viết
controller.deletePost = async (req, res) => {
    const postId = req.params.documentId; // Lấy ID bài viết từ tham số URL

    try {
        const post = await models.Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await post.destroy(); // Xóa bài viết
        return res.status(204).json(); // Trả về trạng thái 204 No Content
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while deleting the post' });
    }
};

module.exports = controller;
