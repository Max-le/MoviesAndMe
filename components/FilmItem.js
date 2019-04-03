import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

class FilmItem extends React.Component {
    render(){
        return(
            <View style={styles.main_container}>
                <View style={styles.globale_container}>
                    <View style={styles.content_container}>
                        <View style={styles.header_container}>
                            <Text style={styles.title_text}>Titre du film</Text> 
                            <Text style={styles.vote_text}>Vote</Text> 
                        </View>
                        <View style={styles.description_container}>
                        <Text styles={styles.description_text}>Description du film</Text>
                        </View>
                        <View style={styles.date_container}> 
                            <Text style={styles.date_text}>Date : Sorti le 03/04/19</Text>
                        </View>
                    </View>
                    <Image style={styles.poster_image}/>

                </View>
                     
                </View>
            )
        }
    }
    
    const styles = StyleSheet.create({
        
        main_container:{
            height: 190,
            backgroundColor:'red',
        },
        globale_container:{
            flexDirection:'row',
            flex:1
        },
        content_container:{},
        header_container:{flexDirection:'row'},
        description_container:{},
        date_text:{},
        poster_image:{},
        vote_text:{},
        description_text:{},
        title_text:{
            
        } 
    })
    export default FilmItem