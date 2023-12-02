import React, {useState, useEffect, useCallback} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axiosApi from '../../axiosApi.ts';

const Post = () => {
    const {postId} = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({
        date: '',
        title: '',
        message: '',
    });

    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axiosApi.get(`posts/${postId}.json`);
                setPost(response.data.posts);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        fetchPost();
    }, [postId]);

    const deletePost = async () => {
        try {
            await axiosApi.delete(`posts/${postId}.json`);
            navigate('/');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const editChange = useCallback((event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    }, []);


    const saveEdit = async () => {
        try {
            await axiosApi.put(`posts/${postId}.json`, {
                posts: post,
            });
            navigate('/');
        } catch (error) {
            console.error('Error saving post edits:', error);
        }
    };

    const editPost = () => {
        setEdit(true);
    };

    const cancelEdit = () => {
        setEdit(false);
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="d-flex flex-column border border-3 border-success rounded-2 p-3 post-size">
                <span className="mb-3">
                    <b><i>Created on: </i></b>{post.date}
                </span>
                {edit ? (
                    <>
                        <label>Edit Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={post.title}
                            onChange={editChange}
                        />
                        <label>Edit Message:</label>
                        <textarea
                            name="message"
                            value={post.message}
                            onChange={editChange}
                        />
                        <div className="d-flex justify-content-end gap-3 mt-4">
                            <button onClick={saveEdit} className="btn btn-danger">Cancel</button>
                            <button onClick={cancelEdit} className="btn btn-warning">Save</button>
                        </div>
                    </>
                ) : (
                    <>
                        <h4 className="mb-3">{post.title}</h4>
                        <p>{post.message}</p>
                        <div className="d-flex justify-content-end gap-3">
                            <button onClick={deletePost} className="w-25 btn btn-danger text-center ps-3">Delete
                            </button>
                            <button onClick={editPost} className="w-25 btn btn-primary text-center ps-3">Edit</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Post;