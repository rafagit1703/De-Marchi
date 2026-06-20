import { Linking, Alert } from 'react-native';

export const WhatsAppService = {
  gerarMensagem: (itensCarrinho, totalValor) => {
    let msg = "🌾 *Novo Pedido - App De Marchi* 🌾\n\n";
    msg += "Olá, gostaria de finalizar o seguinte pedido:\n\n";
    
    itensCarrinho.forEach(item => {
      msg += `- ${item.quantidade}x ${item.produto.nome} (R$ ${item.produto.preco.toFixed(2)} un)\n`;
    });
    
    msg += `\n*TOTAL: R$ ${totalValor.toFixed(2)}*\n\n`;
    msg += "Aguardo retorno para combinar o pagamento e entrega!";
    return msg;
  },

  enviarWhatsApp: async (itensCarrinho, totalValor) => {
    if (itensCarrinho.length === 0) {
      Alert.alert("Carrinho Vazio", "Adicione produtos antes de finalizar.");
      return;
    }

    const NUMERO_VENDEDOR = "5546999006480";
    const mensagem = WhatsAppService.gerarMensagem(itensCarrinho, totalValor);
    
    // Formata o link para abrir o app do WhatsApp nativamente
    const url = `whatsapp://send?phone=${NUMERO_VENDEDOR}&text=${encodeURIComponent(mensagem)}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Erro", "O WhatsApp não parece estar instalado neste dispositivo.");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao tentar abrir o WhatsApp.");
    }
  }
};