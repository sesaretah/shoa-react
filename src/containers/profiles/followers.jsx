import React from "react";
import { Row, CardHeader, Card, CardContent, Col, Link, CardFooter, Chip, Icon } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/fa';
import SimpleList from "./simpleList"

const Followers = (props) => {
    console.log(props)
    if (props.followers) {
        return (
            <Card>
                <CardHeader>
                    {dict.followers}
                </CardHeader>
                <CardContent>
                    <SimpleList profiles={props.followers} />
                </CardContent>
            </Card>)
    } else {
        return (null)
    }
}
export default Followers;
