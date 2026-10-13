// src/screens/DiaryListScreen.js
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import { COLORS, SPACE, TYPO, BREAKPOINTS } from '../styles/tokens';
import happyLocalImage from '../../assets/moods/happy.png';

const DATA = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview: 'Bangun lebih pagi dan jalan kaki 20 menit. Udara sejuk...',
    body: 'Hari ini aku bangun lebih pagi dan berjalan kaki selama 20 menit keliling perumahan. Udara terasa sangat segar dan membantu pikiran lebih rileks sebelum memulai tugas.',
    imageSource: happyLocalImage,
    heroUri: 'https://picsum.photos/seed/happyhero/800/450',
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview: 'Menyelesaikan modul praktikum dan diskusi bareng tim...',
    body: 'Berhasil menyelesaikan tugas tepat waktu di laboratorium komputer dan berdiskusi banyak hal teknis seputar mobile programming bareng teman sekelas.',
    imageSource: { uri: 'https://picsum.photos/seed/focus/200' },
    heroUri: 'https://picsum.photos/seed/focushero/800/450',
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview: 'Menikmati senja sambil membaca buku favorit...',
    body: 'Duduk santai di bangku taman kota sambil melanjutkan membaca novel. Suasana matahari terbenam bikin suasana jadi sangat tenang.',
    imageSource: { uri: 'https://picsum.photos/seed/calm/200' },
    heroUri: 'https://picsum.photos/seed/calmhero/800/450',
  },
  {
    id: 4,
    title: 'Eksplorasi Fitur Baru',
    date: '2025-10-03',
    preview: 'Mencoba Flexbox dan layout responsif multi-kolom...',
    body: 'Mempelajari bagaimana FlatList menangani pergantian orientasi layar portrait dan landscape tanpa merusak struktur visual komponen.',
    imageSource: { uri: 'https://picsum.photos/seed/code/200' },
    heroUri: 'https://picsum.photos/seed/codehero/800/450',
  },
  {
    id: 5,
    title: 'Refleksi Akhir Pekan',
    date: '2025-10-02',
    preview: 'Merapikan workspace dan menyusun target pekan depan...',
    body: 'Waktu luang digunakan untuk beristirahat penuh, membersihkan meja kerja, dan mencatat beberapa ide project aplikasi mobile.',
    imageSource: { uri: 'https://picsum.photos/seed/relax/200' },
    heroUri: 'https://picsum.photos/seed/relaxhero/800/450',
  },
];

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const [selected, setSelected] = useState(null);

  const keyForCols = useMemo(() => (twoCols ? 'grid2' : 'list1'), [twoCols]);

  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        imageSource={item.imageSource}
        variant={twoCols ? 'grid' : 'list'}
        onPress={() => setSelected(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>
      <FlatList
        key={keyForCols}
        data={DATA}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        columnWrapperStyle={twoCols ? { gap: SPACE.m } : undefined}
        contentContainerStyle={{
          padding: SPACE.l,
          paddingTop: SPACE.m,
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada entri.</Text>
        }
      />
      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    color: COLORS.text,
  },
  itemWrap: { flex: 1 },
  itemWrap2: { flex: 1 / 2 },
  empty: { textAlign: 'center', color: COLORS.muted, marginTop: 40 },
});