import React, {Component, useEffect} from 'react';

export type User = {
    name: string
    email: string
    username: string
    password: string
    createdDate: Date
    profileImage: string
};