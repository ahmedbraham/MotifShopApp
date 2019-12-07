import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import showSubCategory from '../images/plusIcon.png'
import hideSubCategory from '../images/moinsIcon.png'
import { getAllCategories } from '../API/api'
import 'react-native-gesture-handler'

export default class DrawerScreen extends React.Component {
    constructor(props) {
        super(props);
        this.parentCategoriesId = []
        this.state = {
            isSubCategory1Hidden: true,
            isSubCategory2Hidden: true,
            isSubCategory3Hidden: true,
            allCategories: []

        };
    }

 

    _getAllCategories() {
        getAllCategories().then((response) => {
            console.log('all categories =', response.data)
            this.setState({ allCategories: response.data })
        })
    }
    componentDidMount() {
        this._getAllCategories()
    }



    _renderCategories() {
        return (
            this.state.allCategories.map((category) => {
                // console.log('cat  =', category.name)
                if (category.parent == 0) {
                    return (
                        this._renderParentCategory(category.name, category.id)
                    )
                }
                
            })
        )
    }



    _renderParentCategory(categoryName, categoryId) {
        const categoryIdExist = this.parentCategoriesId.findIndex(item => item  === categoryId)   
        // si l'element n'est pas trouvé dans le tableau
        if (categoryIdExist == -1) {
            this.parentCategoriesId.push(categoryId) 
        }
   
        return (

            <View>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        
                    }}
                >
                    <View style={{ width: '100%', height: 50, backgroundColor: '#0A698D', flexDirection: 'row', borderBottomColor: '#268BB2', borderBottomWidth: 0.5 }}>
                        <Text style={{ marginStart: 20, paddingTop: 14, color: '#fff', fontSize: 15 }}>{categoryName + ' ' + categoryId}</Text>
                        <Image
                            style={{ width: 11, height: 11, position: 'absolute', end: 30, top: 19 }}
                            source={showSubCategory}
                        />
                    </View>

                </TouchableOpacity>
                {this._renderSubCategories(categoryId) }

             

              
                  


               




            </View>
        )
    }



    _renderSubCategories(parentCategoryId) {
        return (
            this.state.allCategories.map((category) => {
                // console.log('cat  =', category.name)
                if (category.parent == parentCategoryId)
             
                    return (
                        this._renderSubCategory(category.name)
                    )
            })
        )
    }



    _renderSubCategory(SubCategoryName) {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    this.setState({
                        isSubCategory1Hidden: !(this.state.isSubCategory1Hidden),
                        isSubCategory2Hidden: true,
                        isSubCategory3Hidden: true
                    })
                }}
            >
                <View style={{ width: '100%', height: 50, backgroundColor: '#0c7299', flexDirection: 'row', borderBottomColor: '#268BB2', borderBottomWidth: 0.5 }}>
                    <Text style={{ marginStart: 60, paddingTop: 14, color: '#fff', fontSize: 15 }}>{SubCategoryName}</Text>
                  
                </View>
            </TouchableOpacity>
        )
    }
    //---------------------------------
    render() {
        console.log('test33', this.parentCategoriesId)
        return (
            <View style={styles.container}>
                <ScrollView
                >
                    <View >
                        {this._renderCategories()}

                    </View>
                </ScrollView>
            </View>
        );
    }
    //--------------------------------------------------------------------------------
    _renderCategory1() {
        if (this.state.isSubCategory1Hidden) {
            return (<TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    this.setState({
                        isSubCategory1Hidden: !(this.state.isSubCategory1Hidden),
                        isSubCategory2Hidden: true,
                        isSubCategory3Hidden: true
                    })
                }}
            >
                <View style={{ width: '100%', height: 50, backgroundColor: '#0A698D', flexDirection: 'row', borderBottomColor: '#268BB2', borderBottomWidth: 0.5 }}>
                    <Text style={{ marginStart: 20, paddingTop: 14, color: '#fff', fontSize: 15 }}>Category 1</Text>
                    <Image
                        style={{ width: 11, height: 11, position: 'absolute', end: 60, top: 19 }}
                        source={showSubCategory}
                    />
                </View>
            </TouchableOpacity>)
        } else {
            return (
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => { this.setState({ isSubCategory1Hidden: !(this.state.isSubCategory1Hidden) }) }}
                >
                    <View style={{ width: '100%', height: 50, backgroundColor: '#258ab0', flexDirection: 'row', borderBottomColor: '#268BB2', borderBottomWidth: 0.5 }}>
                        <Text style={{ marginStart: 20, paddingTop: 14, color: '#fff', fontSize: 15 }}>Category 1</Text>
                        <Image
                            style={{ width: 10, height: 2, position: 'absolute', end: 60, top: 24 }}
                            source={hideSubCategory}
                        />
                    </View>
                </TouchableOpacity>
            );
        }
    }// End _renderCategory1())
    _renderSubCategory1() {
        if (this.state.isSubCategory1Hidden) {
            return null;
        }
        return (
            <View >
                <TouchableOpacity
                    activeOpacity={0.5} >
                    <View style={{ width: '100%', height: 50, backgroundColor: '#0A698D', flexDirection: 'row', borderBottomColor: '#268BB2', borderBottomWidth: 0.5 }}>
                        <Text style={{ marginStart: 20, paddingTop: 14, marginStart: 50, color: '#fff', fontSize: 15 }}>Sous Category 1</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5} >
                    <View style={{ width: '100%', height: 50, backgroundColor: '#0A698D', flexDirection: 'row', borderBottomColor: '#268BB2', borderBottomWidth: 0.5 }}>
                        <Text style={{ marginStart: 20, paddingTop: 14, marginStart: 50, color: '#fff', fontSize: 15 }}>Sous Category 2</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5} >
                    <View style={{ width: '100%', height: 50, backgroundColor: '#0A698D', flexDirection: 'row', borderBottomColor: '#268BB2', borderBottomWidth: 0.5 }}>
                        <Text style={{ marginStart: 20, paddingTop: 14, marginStart: 50, color: '#fff', fontSize: 15 }}>Sous Category 3</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }// End _renderSubCategory1()
    //_________________________________________________________________________________________
}
DrawerScreen.navigationOptions = {
    header: null,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0077A4',
        paddingTop: 50,
    },
});
