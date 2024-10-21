'use strict';

const models = require('../models');
const controller = {};

// Lấy danh sách tất cả các dự án
controller.getProjects = async (req, res) => {
    try {
        const projects = await models.Project.findAll({
            include: [
                { model: models.Architect, foreignKey: 'architect_id', attributes: ['architect_id', 'name'] },
                { model: models.Customer, foreignKey: 'customer_id', attributes: ['customer_id', 'name'] }
            ],
            attributes: [
                'project_id', 'title', 'slug', 'completion_year', 'summary', 'location', 'image_url', 'seo', 'createdAt', 'updatedAt'
            ]
        });

        // Chuyển đổi dữ liệu thành định dạng yêu cầu
        const formattedProjects = projects.map(project => ({
            project_id: project.project_id,
            title: project.title,
            slug: project.slug,
            completion_year: project.completion_year,
            summary: project.summary,
            location: project.location,
            image_url: project.image_url,
            seo: project.seo,
            architect: project.Architect, // Lấy thông tin kiến trúc sư
            customer: project.Customer, // Lấy thông tin khách hàng
            createdAt: project.createdAt,
            updatedAt: project.updatedAt
        }));

        const response = {
            data: formattedProjects,
            meta: {
                pagination: {
                    page: 1, // Có thể thêm logic phân trang nếu cần
                    pageSize: projects.length,
                    pageCount: 1,
                    total: projects.length
                }
            }
        };

        // return res.status(200).json({ data: projects });
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ message: 'An error occurred while fetching projects', error: error.message });
    }
};

// Tạo dự án mới
controller.createProject = async (req, res) => {
    const { title, slug, completion_year, summary, location, image_url, customer_id, seo } = req.body;

    try {
        const newProject = await models.Project.create({ title, slug, completion_year, summary, location, image_url, customer_id, seo });
        return res.status(201).json(newProject);
    } catch (error) {
        console.error('Error creating project:', error);
        return res.status(500).json({ message: 'An error occurred while creating the project', error: error.message });
    }
};

// Lấy dự án theo ID
controller.getProjectById = async (req, res) => {
    const projectId = req.params.projectId;

    try {
        const project = await models.Project.findByPk(projectId, {
            include: [
                { model: models.Architect, foreignKey: 'architect_id', attributes: ['architect_id', 'name'] },
                { model: models.Customer, foreignKey: 'customer_id', attributes: ['customer_id', 'name'] }
            ]
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(200).json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        return res.status(500).json({ message: 'An error occurred while fetching the project', error: error.message });
    }
};

// Cập nhật dự án theo ID
controller.updateProject = async (req, res) => {
    const projectId = req.params.projectId;
    const { title, slug, completion_year, summary, location, image_url, customer_id, seo } = req.body;

    try {
        const project = await models.Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Cập nhật thông tin dự án
        project.title = title;
        project.slug = slug;
        project.completion_year = completion_year;
        project.summary = summary;
        project.location = location;
        project.image_url = image_url;
        project.customer_id = customer_id;
        project.seo = seo;

        await project.save();

        return res.status(200).json(project);
    } catch (error) {
        console.error('Error updating project:', error);
        return res.status(500).json({ message: 'An error occurred while updating the project', error: error.message });
    }
};

// Xóa dự án theo ID
controller.deleteProject = async (req, res) => {
    const projectId = req.params.projectId;

    try {
        const project = await models.Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.destroy();
        return res.status(204).json(); // Trả về 204 No Content
    } catch (error) {
        console.error('Error deleting project:', error);
        return res.status(500).json({ message: 'An error occurred while deleting the project', error: error.message });
    }
};

module.exports = controller;
