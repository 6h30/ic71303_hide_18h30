'use strict';

const models = require('../models');
const controller = {};

controller.getPages = async (req, res) => {
    try {
        const posts = await models.Page.findAll({
            include: [
                { model: models.Author, as: 'author', attributes: ['author_id'] }, // Bao gồm thông tin tác giả
                { model: models.Comment, as: 'comments', attributes: ['comment_id'] } // Bao gồm bình luận nếu cần
            ],
            attributes: [
                'post_id', 'title', 'description', 'slug', 'content', 'image', 'author_id', 'createdAt', 'updatedAt',
                'seo', 'metaTitle', 'metaDescription', 'metaImage', 'keywords', 'metaRobots', 'structuredData',
                'metaViewport', 'canonicalURL'
            ]
        });

        // Chuyển đổi dữ liệu thành định dạng yêu cầu
        const formattedPages = posts.map(post => ({
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
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
        }));

        const response = {
            data: formattedPages,
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
        console.error('Error fetching posts:', error); // In lỗi ra console
        return res.status(500).json({ message: 'An error occurred while fetching posts', error: error.message });
    }
    
};

// Lấy một thông tin trang cụ thể
controller.getPageById = async (req, res) => {
    const postId = req.params.documentId; // Lấy ID bài viết từ tham số URL

    try {
        const post = await models.Page.findByPk(postId);

        if (!post) {
            return res.status(404).json({ message: 'Page not found' });
        }
        return res.status(200).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while fetching the post' });
    }
};

// Cập nhật thông tin trang cụ thể
controller.updatePage = async (req, res) => {
    const postId = req.params.documentId; // Lấy ID bài viết từ tham số URL
    const { title, content } = req.body; // Lấy dữ liệu từ body

    try {
        const post = await models.Page.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Page not found' });
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

// Xóa thông tin trang cụ thể
controller.deletePage = async (req, res) => {
    const postId = req.params.documentId; // Lấy ID bài viết từ tham số URL

    try {
        const post = await models.Page.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Page not found' });
        }

        await post.destroy(); // Xóa bài viết
        return res.status(204).json(); // Trả về trạng thái 204 No Content
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while deleting the post' });
    }
};

module.exports = controller;
