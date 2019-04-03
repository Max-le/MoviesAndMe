import React from 'react'; 
import {StyleSheet, View, Button, TextInput, Text, FlatList} from 'react-native';
import films from '../Helpers/filmsData';
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from "../API/TMBDApi";

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {films:[]} 
    this.searchedText = ""; 
  }

  

_loadFilms() {
  if (this.searchedText.length > 0) {
    getFilmsFromApiWithSearchedText(this.searchedText).then(data => this.setState({films:data.results}));
  } else {
    console.log("Please enter the name of the movie.")
  }
}

_searchTextInputChanged(text) {
  
  this.searchedText = text; 
  console.log("Text changed.")
}

  render(){
    console.log('RENDERING...')
    return(
      <View style={styles.main_container}>
      <TextInput onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput} placeholder="Title"/>
      <Button title="Search"  onPress={() => this._loadFilms()} />
      <FlatList
      data={this.state.films}
      keyExtractor = {(item) => item.id.toString()}
      renderItem={({item}) => <FilmItem film={item}/>}
      />
      </View>
      )
      
      
    }   
  }
  const styles = StyleSheet.create({
    
    main_container: {
      flex:1,
      marginTop:20,
    },
    textinput: {
      marginLeft: 5,
      marginRight: 5,
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5,
      backgroundColor: 'white'
    }
  })
  export default Search