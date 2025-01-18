const bannerService = require('../services/bannerService');
const bannerValidation = require('../validatiors/bannerValidation');

const bannerController = {
    listBanners: async (req, res) => {
        try {
            const banners = await bannerService.getAllBanners();
            if (!banners.length) {
                return res.status(204).json({ message: 'No banner was returned' });
            }
            
            res.status(200).json(banners);
        } catch (err) {
            console.error('Error listing banners:', err);
            res.status(500).json({ error: 'Internal error while listing banners' });
        }
    },
    addBanner: async (req, res) => {
        try {
            const { error } = bannerValidation.validate(banner);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const banner = await bannerService.createBanner(req.body);
            
            res.status(201).json({ message: 'Banner created successfully', banner });
        } catch (err) {
            console.error('Error creating banner:', err);
            res.status(500).json({ error: 'Internal error while creating banner' });
        }
    },
    editBanner: async (req, res) => {
        try {
            const { error } = bannerValidation.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'Banner not found' });
            }
            
            const rowsAffected = await bannerService.updateBanner(id, req.body);
            if (rowsAffected === 0) {
                return res.status(404).json({ error: 'Banner not found' });
            }

            res.status(200).json({ message: 'Banner updated successfully' });
        } catch (err) {
            console.error('Error updating banner:', err);
            res.status(500).json({ error: 'Internal error while updating banner' });
        }
    },
    removeBanner: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'Banner not found' });
            }

            const rowsAffected = await bannerService.deleteBanner(id);
            if (rowsAffected === 0) {
                return res.status(404).json({ error: 'Banner not found' });
            }

            res.status(200).json({ message: 'Banner removed successfully' });
        } catch (err) {
            console.error('Error removing banner:', err);
            res.status(500).json({ error: 'Internal error while removing banner' });
        }
    }
};

module.exports = bannerController;
