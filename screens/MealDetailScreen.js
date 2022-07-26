// WITH REDUX
import { useLayoutEffect } from 'react';
import { Image, StyleSheet, Text, ScrollView, View } from 'react-native';
import { List } from '../components/MealDetail/List';
import { Subtitle } from '../components/MealDetail/Subtitle';
import { MealDetails } from '../components/MealDetails';
import { MEALS } from '../data';
import { IconButton } from '../components/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/redux/favorites';

export const MealDetailScreen = ({ route, navigation }) => {
  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find(({ id }) => id === mealId);

  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();
  const mealIsFavorite = favoriteMealIds.includes(mealId);

  const changeFavoriteStatusHandler = () => {
    if (mealIsFavorite) {
      dispatch(removeFavorite({ id: mealId }))
    } else if (!mealIsFavorite) {
      dispatch(addFavorite({ id: mealId }))
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
      return (
        <IconButton
          color="#fff"
          icon={mealIsFavorite ? "star" : "star-outline"}
          onPress={changeFavoriteStatusHandler}
        />
      )
    }
    })
  }, [navigation, changeFavoriteStatusHandler])

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: selectedMeal.imageUrl }}
        style={styles.image}
      />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    margin: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    color: '#fff'
  },
  detailText: {
    color: '#fff'
  },
  listContainer: {
    width: '80%',
  },
  listOuterContainer: {
    alignItems: 'center'
  }
});
