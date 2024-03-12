import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import { SideBlock } from './SideBlock';
import { Link } from 'react-router-dom';


export const TagsBlock = ({ tagChanger, tag, sort, items, isLoading = true }) => {

  return (
    <SideBlock title='Тэги'>

      <List>
        <div
          style={{ textDecoration: 'none', color: 'black' }}
          onClick={() => {

            tagChanger('all');

          }}
        >
          <ListItem disablePadding>
            <ListItemButton>

              <ListItemIcon>
                <TagIcon />
              </ListItemIcon>

              <ListItemText primary={'Сброс'} />

            </ListItemButton>
          </ListItem>
        </div>

        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <div
            style={{ textDecoration: 'none', color: 'black' }}
            onClick={() => {
              tagChanger(name);
            }}
          >
            <ListItem key={i} disablePadding>
              <ListItemButton>

                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>

                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}

              </ListItemButton>
            </ListItem>

          </div>

        ))}

      </List>

    </SideBlock>
  );
};
