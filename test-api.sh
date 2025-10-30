

BASE_URL="http://localhost:3000"

echo "🍥 Testando Naruto API"
echo "====================="

# Teste de health check
echo -e "\n✅ Testando health check..."
curl -s $BASE_URL | jq .

# Criar usuário
echo -e "\n✅ Criando usuário de teste..."
TOKEN=$(curl -s -X POST $BASE_URL/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Naruto Uzumaki",
    "email": "naruto@konoha.com",
    "password": "rasengan123"
  }' | jq -r '.token')

if [ -z "$TOKEN" ] || [ "$TOKEN" == "null" ]; then
  echo "❌ Erro ao obter token. Tentando fazer login..."
  TOKEN=$(curl -s -X POST $BASE_URL/auth \
    -H "Content-Type: application/json" \
    -d '{
      "email": "naruto@konoha.com",
      "password": "rasengan123"
    }' | jq -r '.token')
fi

echo "Token obtido: $TOKEN"

# Criar ninja
echo -e "\n✅ Criando ninja..."
NINJA_RESPONSE=$(curl -s -X POST $BASE_URL/ninja \
  -H "Content-Type: application/json" \
  -H "x-api-key: $TOKEN" \
  -d '{
    "name": "Kakashi Hatake",
    "city": "Konoha",
    "uf": "HI",
    "aldeias": ["Aldeia da Folha", "Anbu", "Time 7"]
  }')

echo "$NINJA_RESPONSE" | jq .

NINJA_ID=$(echo "$NINJA_RESPONSE" | jq -r '.data.id')
echo "Ninja criado com ID: $NINJA_ID"

# Listar todos os ninjas
echo -e "\n✅ Listando todos os ninjas..."
curl -s -X GET $BASE_URL/ninjas \
  -H "x-api-key: $TOKEN" | jq .

# Buscar ninja por ID
echo -e "\n✅ Buscando ninja por ID ($NINJA_ID)..."
curl -s -X GET $BASE_URL/ninja/$NINJA_ID \
  -H "x-api-key: $TOKEN" | jq .

# Atualizar ninja
echo -e "\n✅ Atualizando ninja..."
curl -s -X PATCH $BASE_URL/ninja/$NINJA_ID \
  -H "Content-Type: application/json" \
  -H "x-api-key: $TOKEN" \
  -d '{
    "name": "Kakashi Hatake - Sexto Hokage"
  }' | jq .

echo -e "\n🎯 Testes concluídos!"
echo "Dattebayo! 🍥"
