import { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register with email and password
    const register = async (email, password, name, photoURL) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Update profile with name and photo
            await updateProfile(userCredential.user, {
                displayName: name,
                photoURL: photoURL
            });

            // Generate JWT token
            await generateToken(email);

            toast.success('Registration successful!');
            return userCredential;
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    };

    // Login with email and password
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // Generate JWT token
            await generateToken(email);

            toast.success('Login successful!');
            return userCredential;
        } catch (error) {
            toast.error('Invalid email or password');
            throw error;
        }
    };

    // Login with Google
    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);

            // Generate JWT token
            await generateToken(userCredential.user.email);

            toast.success('Google login successful!');
            return userCredential;
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    };

    // Logout
    const logout = async () => {
        try {
            await signOut(auth);
            // Clear JWT cookie
            await api.post('/api/auth/logout');
            toast.success('Logged out successfully!');
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    };

    // Generate JWT token
    const generateToken = async (email) => {
        try {
            await api.post('/api/auth/login', { email });
        } catch (error) {
            console.error('Error generating token:', error);
        }
    };

    // Monitor auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        loading,
        register,
        login,
        loginWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
