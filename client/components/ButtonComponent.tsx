import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {questSelector} from '../redux/questSlice';
import {useDispatch} from 'react-redux';
import {addQuest} from '../redux/questSlice';
import {getToken} from '../funcs/dispatch/dispatchFuncs';
import {useIsFocused} from '@react-navigation/core';

const ButtonComponent = ({item}) => {
  const [disabled, setDisabled] = useState(false);
  const {activeQuests} = useSelector(questSelector);
  const isFocus = useIsFocused();
  const dispatch = useDispatch();

  const setDisabledBtn = () => {
    activeQuests.filter(quest => {
      if (quest.name === item.name) {
        setDisabled(!disabled);
      }
    });
  };

  const addToMyQuests = async id => {
    dispatch(
      addQuest({
        api: {
          url: `quest/start/${id}`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    );
    setDisabled(true);
  };

  useEffect(() => {
    setDisabledBtn();
  }, [isFocus]);

  return (
    <>
      <Button
        title="Add to quests"
        disabled={disabled}
        onPress={() => addToMyQuests(item.id)}
      />
    </>
  );
};

export default ButtonComponent;
