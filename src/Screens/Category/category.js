import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Dimensions, ScrollView, ImageBackground } from 'react-native';
import { GetCategories } from '../../Service/calls';

const screenWidth = Dimensions.get('window').width;

const CategoryScreen = ({ navigation }) => {

  const [customData, setCustomData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
        try {
            const result = await GetCategories();
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
  // Função para renderizar cada item da lista
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.itemContainer}
        onPress={() => navigation.navigate('Produtos da Categoria', { itemId: item.products_category_id, itemName: item.category_name })}
      >
        <ImageBackground 
          style={styles.imageBackground} // Estilo para fazer a imagem ocupar 100% do TouchableOpacity
          imageStyle={styles.image} // Garantir que a imagem seja corretamente dimensionada
        >
          <View style={styles.innerContainer}>
            <Image style={styles.imageArray} source={{ uri: item.category_image }} />
            <Text style={styles.text}>{item.category_name}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Contêiner para centralizar a imagem responsiva */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://raw.githubusercontent.com/ViniciusOkaeda/u-commerce/refs/heads/main/src/Assets/saleinit.png' }} // URL da imagem
          style={styles.responsiveImage}
           // Garantir que a imagem se ajuste corretamente
        />
      </View>

      {/* FlatList que exibe os itens abaixo da imagem */}
      {loading === false ?
      <FlatList
        data={customData.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Gerar chave única para cada item
        numColumns={2} // Número de colunas na grade
        columnWrapperStyle={styles.columnWrapper} // Estilo para o wrapper das colunas
        contentContainerStyle={styles.contentContainer}
      />
      
      : ""}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', // Cor de fundo da tela
  },
  columnWrapper: {
    justifyContent: 'space-between', // Espaçar os itens na linha
    paddingHorizontal: 10, // Espaçamento lateral
    paddingTop: 10
  },
  contentContainer: {
    paddingBottom: 80, // Espaço adicional no final da lista para evitar que o último item fique grudado no menu inferior
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff', // Não precisa de cor de fundo aqui, pois a imagem será o fundo
    borderRadius: 5,
    height: 210,
    shadowColor: "#444444",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.00,
    elevation: 1,
    marginHorizontal: 5, // Espaço entre os itens na mesma linha
  },
  imageBackground: {
    flex: 1,
    width: '100%', // A imagem vai ocupar 100% da largura do TouchableOpacity
    height: '100%', // A imagem vai ocupar 100% da altura do TouchableOpacity
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5, // Borda arredondada (opcional)
  },
  image: {
    borderRadius: 10, // Borda arredondada (opcional)
    resizeMode: 'cover', // Faz com que a imagem cubra toda a área do componente sem deformá-la
  },
  imageArray: {
    width: 175,
    height: 160,
    /*
    
    backgroundColor: 'rgba(255,255,255, 0.4)',
    */
    resizeMode: 'contain', // Faz com que a imagem cubra toda a área do componente sem deformá-la
    borderRadius: 15,
    marginBottom: 5
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 5, // Padding ao redor do conteúdo
  },
  imageContainer: {
    alignItems: 'center', // Centraliza horizontalmente
    justifyContent: 'center', // Centraliza verticalmente
    marginTop: 10,

  },
  responsiveImage: {
    width: screenWidth - 20, // Largura da imagem igual à largura da tela
    height: 200, // Definindo altura fixa, ou pode ser ajustado proporcionalmente
    borderRadius: 10
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Cor branca para o texto, para garantir contraste com a imagem
    textShadowColor: 'rgba(0, 0, 0, 0)', // Sombras para tornar o texto mais legível
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

export default CategoryScreen;
