/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import DraftItem from '../components/draftItem';

export default function DraftScreen() {
  const [token, setToken] = useState(null);
  const [drafts, setDrafts] = useState(null);
  const [draftDeleted, setDraftDeleted] = useState(false);

  const LoadTokenIDdrafts = () => {
    AsyncStorage.getItem('whatsthat_session_token').then((data) => {
      if (data !== null) {
        setToken(data);
      }
    }).catch(
      (error) => (error),
    );
    AsyncStorage.getItem('Drafts').then((data) => {
      if (data !== null) {
        setDrafts(JSON.parse(data));
        setDraftDeleted(false);
      }
    }).catch(
      (error) => (error),
    );
  };

  const deleted = () => {
    setDraftDeleted(true);
  };

  useEffect(() => {
    LoadTokenIDdrafts();
  }, []);

  useEffect(() => {
    LoadTokenIDdrafts();
  }, [draftDeleted]);

  return (
    <FlatList
      style={{ backgroundColor: 'black' }}
      data={drafts}
      renderItem={({ item }) => (
        <DraftItem
          draft={item}
          token={token}
          draftArr={drafts}
          deleted={deleted}
        />
      )}
    />
  );
}
