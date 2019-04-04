import React from 'react'; 
import {StyleSheet, View, Button, TextInput, Text, FlatList, ActivityIndicator} from 'react-native';
import films from '../Helpers/filmsData';
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from "../API/TMBDApi";

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {films:[], isLoading:false} 
    this.searchedText = "";  
    this.page = 0, 
    this.totalPages = 0
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({
            films: [ ...this.state.films, ...data.results ],
            isLoading: false
          })
      })
    }
}
_displayLoading() {
  if (this.state.isLoading) {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size='large' />
        {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
      </View>
    )
  }
}

_searchTextInputChanged(text) {
  this.searchedText = text; 
}

  render(){
    console.log(this.state)
    return(
      <View style={styles.main_container}>
      <TextInput onChangeText={(text) => this._searchTextInputChanged(text)}
      onSubmitEditing={() => this._loadFilms()} style={styles.textinput} placeholder="Title"/>
      <Button title="Search"  onPress={() => this._loadFilms()} />
      <FlatList
      data={this.state.films}
      keyExtractor = {(item) => item.id.toString()}
      renderItem={({item}) => <FilmItem film={item}/>}
      onEndReachedThreshold={0.5}
      onEndReached ={() => {
        console.log('on end reached')
        if (this.page < this.totalPages) this._loadFilms()}}
      />
      {this._displayLoading()}
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
    },
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 100,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
  export default Search