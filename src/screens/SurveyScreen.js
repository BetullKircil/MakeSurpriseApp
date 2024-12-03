import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";

const SurveyScreen = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions = [
    {
      question: "1-) Cinsiyetiniz nedir?",
      options: ["Kadın", "Erkek"],
    },
    {
      question: "2-) Yaşınız hangi aralıktadır?",
      options: ["18-25", "26-35", "36-45", "46-55", "56+"],
    },
    {
      question: "3-) Hangi alanlar sizi ilgilendirir?",
      options: [
        "Kitaplar ve Edebiyat",
        "Teknoloji ve Cihazlar",
        "Spor ve Aktiviteler",
        "Moda ve Giyim",
        "Sanat ve El Sanatları",
        "Seyahat ve Macera",
        "Yemek ve Mutfak",
        "Ev Dekorasyonu",
        "Müzik ve Konserler",
      ],
    },
    {
        question: "4-) Hayatında sıklıkla hangi renge yer verirsin?",
        options: [
          "Mavi",
          "Yeşil",
          "Kırmızı",
          "Sarı",
          "Mor",
          "Pembe",
          "Siyah",
          "Beyaz",
          "Gri",
        ],
      },
      {
        question: "5-) Alışveriş yaparken genellikle aylık ne kadar bir bütçe ayırırsınız?",
        options: [
          "0-500 TL",
          "501-1000 TL",
          "1001-2000 TL",
          "2001-5000 TL",
          "5001 TL ve üzeri",
        ],
      },
      {
        question: "6-) Alışveriş yaparken hangi kategorilere daha fazla bütçe ayırırsınız?",
        options: [
          "Giyim ve Moda",
          "Teknoloji ve Elektronik",
          "Ev Dekorasyonu ve Mobilya",
          "Gıda ve Market Alışverişi",
          "Eğlence ve Hobiler",
          "Seyahat ve Tatil",
          "Sağlık ve Kişisel Bakım",
        ],
      },
      {
        question: "7-) Seyahat etmeyi seviyor musunuz?",
        options: [
          "Şehir merkezlerini keşfetmek",
          "Doğa tatilleri (dağ evi, kamp, doğa yürüyüşleri)",
          "Plaj tatilleri",
          "Kültürel ve tarihi mekanları ziyaret etmek",
          "Aktif ve macera dolu tatiller (rafting, sörf, dağ tırmanışı)",
          "Şehir dışı ve uzun yolculuklar",
        ],
      },
      {
        question: "8-) Hangi mevsimi veya hava koşullarını en çok seversiniz ve bu mevsime özgü aktiviteleri yapmaktan hoşlanır mısınız?",
        options: [
          "İlkbahar - Doğanın uyanışını izlemek, piknik yapmak, bahçe işleriyle uğraşmak",
          " Yaz - Plajda güneşlenmek, yüzme, açık hava konserlerine katılmak",
          "Sonbahar - Yaprakların renk değiştirdiği manzaraları görmek, kamp yapmak, doğa yürüyüşleri",
          "Kış - Kayak yapmak, kar topu oynamak, sıcak içeceklerle evde kitap okumak",
        ],
      },    
      {
        question: "9-) Hediye alırken kişiselleştirilmiş ürünleri mi yoksa daha genel kullanıma uygun olanları mı tercih edersiniz?",
        options: [
          "Kişiselleştirilmiş ürünler",
          "Genel kullanıma uygun olanlar",
        ],
      },
      {
        question: "10-) Hangi tür restoranlarda yemek yemeyi tercih edersiniz?",
        options: [
          "Geleneksel yerel lezzetler sunan restoranlar",
          "Uygun fiyatlı ve hızlı yemek restoranları",
          "Lüks ve fine dining restoranlar",
          "Vejetaryen veya vegan restoranlar",
          "Uzak doğu mutfağı restoranları",
          "Fast food restoranları",
        ],
      },
      {
        question: "11-) Hangi tür ev dekorasyonunu tercih edersiniz?",
        options: [
          "Modern ve minimalist",
          "Vintage ve antika",
          "Doğal ve rustik",
          "Bohem ve etnik",
          "Lüks ve gösterişli",
          "Sanatsal ve yaratıcı",
        ],
      },
      {
        question: "12-) Hangi tür teknolojik ürünleri kullanmayı tercih edersiniz?",
        options: [
          "Akıllı telefonlar ve tabletler",
          "Dizüstü ve masaüstü bilgisayarlar",
          "Giyilebilir teknoloji (akıllı saatler, fitness izleyicileri vb.)",
          "Oyun konsolları ve oyun ekipmanları",
          "Ev otomasyonu ve akıllı ev cihazları",
          "Fotoğraf ve video ekipmanları",
        ],
      },
      {
        question: "13-) Hangi tür koku veya parfüm notalarını tercih edersiniz?",
        options: [
          "Çiçeksi ve tatlı notalar",
          "Odunsu ve baharatlı notalar",
          "Taze ve narenciye notaları",
          "Dumanlı ve derin notalar",
          "Tatlı ve vanilyalı notalar",
          "Temiz ve ferah notalar",
        ],
      },
      {
        question: "14-) Hangi tür kıyafet kombinasyonları sizi en çok ifade eder?",
        options: [
          "Rahat ve spor giyim tarzı",
          "Klasik ve zarif giyim tarzı",
          "Hipster ve alternatif giyim tarzı",
          "Bohem ve özgür ruhlu giyim tarzı",
          "Vintage ve retro giyim tarzı",
        ],
      },
      {
        question: "15-) Hangi tür ışıklandırmayı tercih edersiniz?",
        options: [
          "Doğal güneş ışığı",
          "Loş ve romantik mum ışığı",
          "Parlak ve enerjik floresan ışık",
          "Yumuşak ve rahatlatıcı LED ışık",
          "Renkli ve eğlenceli parti ışıkları",
          "Aydınlatılmış şehir manzarası",
        ],
      },
  ];

  const [answers, setAnswers] = useState([]);

  const handleNext = (answer) => {
    setAnswers((prev) => [...prev, answer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      console.log("Anket tamamlandı:", answers);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        {questions[currentQuestionIndex].question}
      </Text>

      {questions[currentQuestionIndex].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => handleNext(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.progress}>
        Soru {currentQuestionIndex + 1} / {questions.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F9F9F9",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#6200EE",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  optionText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  progress: {
    marginTop: 20,
    textAlign: "center",
    color: "#666",
  },
});

export default SurveyScreen;
