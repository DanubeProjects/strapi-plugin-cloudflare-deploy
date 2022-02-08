/*
 *
 * HomePage
 *
 */

import React, {memo, useEffect, useState} from 'react';
import getMessage from "../../utils/getMessage";
import axiosInstance from "../../utils/axiosInstance";
import getApiURL from "../../utils/getApiUrl";
import {LoadingIndicatorPage, useNotification} from '@strapi/helper-plugin';
import handleAPIError from "../../utils/handleApiError";
import {HeaderLayout} from '@strapi/design-system/Layout';
import {Button} from '@strapi/design-system/Button';
import {Box} from '@strapi/design-system/Box';
import {Typography} from '@strapi/design-system/Typography';

const HomePage = () => {
  const toggleNotification = useNotification();

  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    const fetchInstances = async () => {
      try {
        const {data} = await axiosInstance.get(getApiURL(''));
        setInstances(data.instances);
        setReady(true);
      } catch (error) {
        handleAPIError(error, toggleNotification);
      }
    };

    fetchInstances();
  }, []);

  const triggerPublish = async (id) => {
    setBusy(true);

    try {
      await axiosInstance.post(getApiURL('publish'), {id});
    } catch (error) {
      handleAPIError(error, toggleNotification);
    } finally {
      setBusy(false);
    }
  };

  const handleClick = (id) => () => {
    console.log('HANDLE CLICK', id);
    if (window.confirm('Are you sure ?')) {
      triggerPublish(id);
    }
  };

  return (
    <Box>
      <HeaderLayout
        title={getMessage('home.title')}
        subtitle={`${getMessage('home.description')}`}
        as="h2"
      />
      <Box paddingLeft={8}>
        {ready ? (busy ? (
          <>
            <Typography>{getMessage("home.busy")}</Typography>
          </>
        ) : (
          <>
            <Typography>
              {getMessage("home.prompt")}
            </Typography>

            {instances.map((instance) => (
              <Box padding={4} key={instance.id}>
                <Button color="primary" onClick={handleClick(instance.id)}>
                  {getMessage("home.button.publish") + instance.name}
                </Button>
              </Box>)
            )}
          </>
        )) : (
          <>
            <LoadingIndicatorPage/>
          </>
        )}
      </Box>
    </Box>
  );
};

export default memo(HomePage);
