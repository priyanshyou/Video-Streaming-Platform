import User from '../models/User.js';

// @desc    Get all users (Admin)
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');

        res.json({
            count: users.length,
            users,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user role (Admin)
// @route   PUT /api/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.json({
            message: 'User role updated successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user (Admin)
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.deleteOne();

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
