import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { GetHomepage } from '../../Service/calls';
import Icon from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window'); // Pegando a largura da tela
const HomeScreen = ({navigation}) => {

  const [customData, setCustomData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
        try {
            const result = await GetHomepage();
            if (result) {
                if (result.status === 1) {
                  setCustomData(result.response)
                }
            }
        } catch (err) {
            console.log(err.message || 'An error occurred');
        } finally {
            setLoading(false); // Dados carregados, então setar como false
        }
    };

    loadData(); // Chama a função de carregamento ao montar o componente


}, []); // Dependência vazia para garantir que loadData só seja chamado uma vez

  
  // Array de imagens para o carousel
  const images = [
    { url: 'https://raw.githubusercontent.com/ViniciusOkaeda/u-commerce-aps/refs/heads/main/src/Assets/collection1.png' },
    { url: 'https://raw.githubusercontent.com/ViniciusOkaeda/u-commerce-aps/refs/heads/main/src/Assets/collection2.png' },
    { url: 'https://raw.githubusercontent.com/ViniciusOkaeda/u-commerce-aps/refs/heads/main/src/Assets/collection3.png' },
    { url: 'https://raw.githubusercontent.com/ViniciusOkaeda/u-commerce-aps/refs/heads/main/src/Assets/collection4.png' },
    { url: 'https://raw.githubusercontent.com/ViniciusOkaeda/u-commerce-aps/refs/heads/main/src/Assets/collection5.png' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Estado para controlar o índice da imagem atual

  // Ref para o FlatList
  const carouselRef = useRef(null);

  // Função para atualizar o índice do carousel
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate('Detalhes do Produto', { itemId: item.products_id, categoryItemId: item.products_category })      
        }}
      >
        <View style={styles.containerImage}>
          <Image style={styles.image} source={{ uri: item.products_image }} />
          <TouchableOpacity style={styles.containerImageFavoriteButton}>
            <Icon name="heart" size={16} color="#44f2a7" />
          </TouchableOpacity>
        </View>

        <View style={styles.containerContent}>
          <Text style={styles.textHeader}>{item.products_name}</Text>
          <Text style={styles.textContent}>R$: {item.products_price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Função para renderizar cada item do Carousel
  const renderCarouselItem = ({ item, index }) => {
    return (
      <View style={[styles.carouselItem, { width: width * 0.85, marginHorizontal: 10 }]}>
        <Image style={styles.carouselImage} source={{ uri: item.url }} />
      </View>
    );
  };
 
    return(
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Imagem acima do carousel */}
      <View style={styles.bottomImageContainer}>
        <Image
          source={{ uri: 'https://raw.githubusercontent.com/ViniciusOkaeda/u-commerce-aps/refs/heads/main/src/Assets/promoblack.jpg' }} // Insira o URL da imagem desejada
          style={styles.bottomImage}
        />
      </View>
      {/* Texto acima do carousel */}
      <View style={styles.textAboveCarousel}>
        <Text style={styles.carouselTitle}>Condições especiais para você!</Text>
      </View>

      {/* Carousel de imagens */}
      <View style={styles.carouselContainer}>
        <FlatList
          ref={carouselRef}
          data={images}
          horizontal={true}
          renderItem={renderCarouselItem}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }} // Espaçamento entre os itens
          onViewableItemsChanged={onViewableItemsChanged} // Detecta o item visível
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }} // Definição de visibilidade do item (50% da imagem visível)
        />
        {/* Indicador de página */}
        <View style={styles.indicatorContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentIndex && { backgroundColor: '#44f2a7', width: 10 },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Imagem abaixo do carousel */}
      <View style={styles.bottomImageContainer2}>
        <Image
          source={{ uri: 'https://raw.githubusercontent.com/ViniciusOkaeda/u-commerce-aps/refs/heads/main/src/Assets/destaques2.png' }} // Insira o URL da imagem desejada
          style={styles.bottomImage2}
        />
      </View>

      {/* Lista de Produtos */}
      {loading === false ?
      <FlatList
        data={customData.data.filter(e => e.products_category === 1)}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
      />
      : ""}
    </ScrollView>
)
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    height: "100%",
  },
  contentContainer: {
    paddingBottom: 80, // Espaço adicional no final para evitar que o conteúdo grude no final da tela
  },
  textAboveCarousel: {
    marginTop: 20, // Margem superior
    alignItems: 'flex-start', // Alinha à esquerda
    justifyContent: 'center',
    marginBottom: 10,
    paddingLeft: 20, // Adiciona espaçamento à esquerda para alinhar com os cards
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  carouselContainer: {
    height: 280, // Altura do carousel
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    height: 280,
    width: 340, // Ajusta a largura da imagem ao tamanho do item
    borderRadius: 10,
    resizeMode: 'cover', // Ajusta a imagem ao tamanho do container sem distorção
  },
  indicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  indicator: {
    width: 6,
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 3,
    margin: 3,
  },
  itemContainer: {
    flex: 1,
    height: 320,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 0,
    marginHorizontal: 5,
  },
  containerImage: {
    width: "100%",
    borderRadius: 20,
    height: "85%",
    position: 'relative',
    backgroundColor: "#000000",
  },
  containerImageFavoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 35,
    height: 35,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  containerContent: {
    width: "100%",
    height: "15%",
    flex: 1,
  },
  textHeader: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 14,
    color: '#444',
  },
  textContent: {
    fontWeight: '400',
    marginTop: 2.5,
    fontSize: 12,
    color: '#9C9C9C',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 0,
    paddingTop: 20,
  },
  bottomImage: {
    marginTop: 10,
    borderRadius: 10,
    width: '95%', // Ajusta a largura da imagem para 90% da largura da tela
    height: 180, // Altura ajustada da imagem
    resizeMode: 'cover', // Ajuste para manter a proporção
    alignSelf: 'center', // Centraliza a imagem horizontalmente
  },
  bottomImage2: {
    width: '100%',
    height: 90, // Altura ajustada da imagem
    resizeMode: 'cover', // Ajuste para manter a proporção
    marginTop: 20

  },
});

  export default HomeScreen;