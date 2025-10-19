
export const validateForm = (req,res,next) => {
        const {username, email, password, role } = req.body;
        if (!role || (role !== 'user' && role !== 'admin')) {
        return next({ status: 400, message: 'Please select a your role' });
    }

        if (!username || username.length < 3) {
        return next({ status: 400, message: 'Username must be at least 3 characters' });
    }
        
       
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            return next({ status: 400, message: 'Email address is required' });
        } else if (!emailRegex.test(email)) {
         return next({ status: 400, message: 'Invalid email address' });
        }
        
        if (!password) {
            return next({ status: 400, message: 'Password is required' });
        } else if (password.length < 8) {
            return next({ status: 400, message: 'Password must be contained atleast 8 characters' });;
        }
       next();
    };



