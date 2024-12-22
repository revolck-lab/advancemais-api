const bannerModel = require('../models/bannerModel');

const bannerService = {
    getAllBanners: async () => {
        try {
            const banners = await bannerModel.getBanners();
            if (!banners.length) {
                throw new Error('No banners found');
            }
            return banners;
        } catch (err) {
            console.error('Error retrieving banners:', err.message);
            throw new Error('Unable to retrieve banners');
        }
    },
    createBanner: async (data) => {
        try {
            if (!data.banner_url || !data.title || !data.description) {
                throw new Error('All fields are required');
            }
            const id = await bannerModel.createBanner(data);
            return id;
        } catch (err) {
            console.error('Error creating banner:', err.message);
            throw new Error('Unable to create banner');
        }
    },
    updateBanner: async (id, data) => {
        try {
            if (!data.banner_url || !data.title || !data.description) {
                throw new Error('All fields are required');
            }
            const rowsAffected = await bannerModel.updateBanner(id, data);
            if (rowsAffected === 0) {
                throw new Error('Banner not found');
            }
            return rowsAffected;
        } catch (err) {
            console.error('Error updating banner:', err.message);
            throw new Error('Unable to update banner');
        }
    },
    deleteBanner: async (id) => {
        try {
            const rowsAffected = await bannerModel.deleteBanner(id);
            if (rowsAffected === 0) {
                throw new Error('Banner not found');
            }
            return rowsAffected;
        } catch (err) {
            console.error('Error deleting banner:', err.message);
            throw new Error('Unable to delete banner');
        }
    }
};

module.exports = bannerService;
