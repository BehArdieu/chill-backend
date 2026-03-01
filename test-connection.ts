// Script de test de connexion à Supabase
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔍 Test de connexion à Supabase...\n');
    
    // Test 1: Connexion à la base de données
    console.log('1️⃣ Test de connexion...');
    await prisma.$connect();
    console.log('✅ Connexion réussie!\n');
    
    // Test 2: Vérifier les tables
    console.log('2️⃣ Vérification des tables...');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    console.log('📊 Tables disponibles:', tables);
    console.log('✅ Tables accessibles!\n');
    
    // Test 3: Compter les utilisateurs
    console.log('3️⃣ Test de requête (compte utilisateurs)...');
    const userCount = await prisma.user.count();
    console.log(`👥 Nombre d'utilisateurs: ${userCount}\n`);
    
    // Test 4: Vérifier PostGIS (si disponible)
    console.log('4️⃣ Vérification de PostGIS...');
    try {
      const postgisVersion = await prisma.$queryRaw`
        SELECT PostGIS_version();
      `;
      console.log('🗺️ PostGIS disponible:', postgisVersion);
      console.log('✅ PostGIS fonctionnel!\n');
    } catch (error) {
      console.log('⚠️ PostGIS non disponible (optionnel)\n');
    }
    
    console.log('🎉 Tous les tests sont passés! La connexion à Supabase fonctionne correctement.');
    
  } catch (error) {
    console.error('❌ Erreur de connexion:', error);
    console.error('\n💡 Vérifiez:');
    console.error('   - DATABASE_URL dans le fichier .env');
    console.error('   - Que votre projet Supabase est actif');
    console.error('   - Que les credentials sont corrects');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
