import React from "react";
import { Page, Navbar, List, Button, ListItem, ListInput, Icon, Link, Card, CardHeader, CardContent, CardFooter } from 'framework7-react'; import crypto from 'crypto-js';
import { dict } from "../../Dict";



const PrivacyIndex = (props) => {
    if (props.profilePrivacy) {
        function findSetting(settings, title){
            for (let i = 0; i < settings.length; i++) {
                if(settings[i].title == title){
                    return settings[i].value
                }
            }
        }
        function options(op, title,settings) {
            var result = [<option></option>]
            var selected = false
            for (let i = 0; i < op.length; i++) {
                if(op[i].title == findSetting(settings, title)){
                    selected = true
                } else {
                    selected = false
                }
                result.push(
                    <option value={op[i].title} selected={selected}>
                        {op[i].label}
                    </option>
                )
            }
            return result
        }


        return (
            <Page >
                <Navbar title={dict.privacy_settings} backLink={dict.back}>
                    <Link panelOpen="right">
                        <Icon f7="bars"></Icon>
                    </Link>
                </Navbar>
                <Card>
                    <CardHeader>{dict.settings}</CardHeader>
                    <CardContent>
                        <List >
                            {props.profilePrivacy.setting_schemas.map((schema) =>
                                <ListInput
                                    label={schema.label}
                                    type="select"
                                    onChange={(e) => {
                                        props.handleChangeValue( schema.title, e.target.value)
                                    }
                                    }
                                >
                                    {options(schema.options, schema.title ,props.privacySettings)}
                                </ListInput>)}
                        </List>
                    </CardContent>
                    <CardFooter>
                        <Link></Link>
                         <Button className="col" fill  onClick={props.submit}>{dict.submit}</Button>          
                    </CardFooter>
                </Card>
            </Page>
        )
    } else {
        return (null)
    }
}
export default PrivacyIndex;
