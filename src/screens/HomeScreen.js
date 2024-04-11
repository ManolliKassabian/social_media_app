import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { Container } from '../styles/FeedStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostCard from '../components/PostCard';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const fetchPosts = useCallback(async () => {
      try {
          const list = [];
          const querySnapshot = await firestore()
              .collection('posts')
              .orderBy('postTime', 'desc')
              .get();
          
          querySnapshot.forEach((doc) => {
              const { userId, post, postImg, postTime, likes, comments } = doc.data();
              list.push({
                  id: doc.id,
                  userId,
                  userName: 'Test Name',
                  userImg: 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                  postTime,
                  post,
                  postImg,
                  liked: false,
                  likes,
                  comments,
              });
          });

          setPosts(list);

          if (loading) {
              setLoading(false);
          }
      } catch (error) {
          console.error('Error fetching posts:', error);
      }
  }, [loading]);

  useEffect(() => {
      fetchPosts();
  }, [fetchPosts]);

  const deletePost = useCallback(async (postId) => {
      try {
          const documentSnapshot = await firestore()
              .collection('posts')
              .doc(postId)
              .get();

          if (documentSnapshot.exists) {
              const { postImg } = documentSnapshot.data();

              if (postImg) {
                  const storageRef = storage().refFromURL(postImg);
                  const imageRef = storage().ref(storageRef.fullPath);

                  const imageExists = await imageRef.getMetadata().then(
                      () => true,
                      () => false
                  );

                  if (imageExists) {
                      await imageRef.delete();
                      console.log(`${postImg} has been deleted successfully.`);
                  } else {
                      console.log(`Image at ${postImg} does not exist.`);
                  }
              }

              await firestore()
                  .collection('posts')
                  .doc(postId)
                  .delete();

              fetchPosts();
              Alert.alert('Post deleted!', 'Your post has been deleted successfully!');
          } else {
              console.log(`Post with ID ${postId} does not exist.`);
          }
      } catch (error) {
          console.error('Error deleting post:', error);
      }
  }, [fetchPosts]);

  const renderItem = useCallback(({ item }) => (
      <PostCard item={item} onDelete={deletePost} />
  ), [deletePost]);

  const memoizedFlatList = useMemo(() => (
      <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
      />
  ), [posts, renderItem]);

  return (
      <Container>
          {memoizedFlatList}
      </Container>
  );
};

export default HomeScreen;
