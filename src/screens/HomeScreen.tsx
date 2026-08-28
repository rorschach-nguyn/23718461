// src/screens/HomeScreen.tsx
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  View,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Typography from '@components/ui/Typography';
import ShopInput from '@components/ui/ShopInput';
import ShopButton from '@components/ui/ShopButton';
import { useCountdown } from '@hooks/useCountdown';
import { useTheme } from '@contexts/ThemeContext';
import {
  STUDENT,
  BANNER_IMAGE_ID,
  FLASH_SECONDS,
  VARIANT,
  examStamp,
} from '@constants/student';
import { fetchProducts, ProductItem, CategoryId } from '@services/productApi';
import { SIZES } from '@constants/theme';

interface ChipItem {
  id: CategoryId;
  label: string;
}

const CHIP_LIST_STANDARD: ChipItem[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'food', label: 'Đồ ăn' },
  { id: 'drink', label: 'Nước' },
  { id: 'study', label: 'Học tập' },
];

const CHIP_LIST_REVERSED: ChipItem[] = [
  { id: 'study', label: 'Học tập' },
  { id: 'drink', label: 'Nước' },
  { id: 'food', label: 'Đồ ăn' },
  { id: 'all', label: 'Tất cả' },
];

const HomeScreen = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  
  // Chip khởi tạo: lấy chip đầu tiên theo thứ tự
  const chips = VARIANT.chipsReversed ? CHIP_LIST_REVERSED : CHIP_LIST_STANDARD;
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(chips[0].id);

  const { timeLeft, isFinished } = useCountdown(FLASH_SECONDS);
  const stamp = useMemo(() => examStamp(), []);
  const aliveRef = useRef(true);

  // Định dạng thời gian Flash Sale mm:ss
  const flashTimeFormatted = useMemo(() => {
    const m = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }, [timeLeft]);

  // Gọi API lấy danh sách món
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      if (aliveRef.current) {
        setProducts(data);
      }
    } catch {
      if (aliveRef.current) {
        setError(`${STUDENT.mssv} — Không tải được dữ liệu món.`);
      }
    } finally {
      if (aliveRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    aliveRef.current = true;
    load();
    return () => {
      aliveRef.current = false;
    };
  }, [load]);

  // Lọc sản phẩm theo keyword và category bằng useMemo
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchKeyword = item.title.toLowerCase().includes(keyword.trim().toLowerCase());
      const matchCategory =
        selectedCategory === 'all' || item.categoryType === selectedCategory;
      return matchKeyword && matchCategory;
    });
  }, [products, keyword, selectedCategory]);

  // Placeholder xử lý bấm nút Đặt (sẽ tích hợp Modal ở Câu 3)
  const handlePressProduct = useCallback((item: ProductItem) => {
    console.log('Chọn món:', item.title);
  }, []);

  // Khối (0) Watermark Dòng tên TH1
  const renderWatermark = () => (
    <View style={[styles.watermarkRow, { backgroundColor: colors.surface }]}>
      <Typography variant="small" color={colors.textLight} style={styles.watermarkText}>
        TH1 · {STUDENT.mssv} · {STUDENT.hoTen} · #{stamp}
      </Typography>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* (0) Watermark ở trên nếu watermarkAtTop = true */}
      {VARIANT.watermarkAtTop && renderWatermark()}

      {/* (A) Header CAMPUSMART + Nút Sáng/Tối + Flash Sale */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <View style={styles.headerTopRow}>
          <Typography variant="h1" color={colors.primary} style={styles.brandTitle}>
            CAMPUSMART
          </Typography>

          {/* Nút Sáng/Tối (Pressable theo biến thể số cuối 1) */}
          <Pressable
            onPress={toggleTheme}
            style={({ pressed }) => [
              styles.themeBtn,
              { borderColor: colors.border, backgroundColor: colors.background },
              pressed && { opacity: 0.7 },
            ]}
          >
            <Typography variant="body2" color={colors.text}>
              {isDark ? '☀️ Sáng' : '🌙 Tối'}
            </Typography>
          </Pressable>
        </View>

        <View style={styles.headerBottomRow}>
          <Typography variant="body2" color={colors.textLight}>
            Tiện lợi KTX
          </Typography>
          <Typography variant="body2" color={colors.secondary} style={styles.flashText}>
            {isFinished ? 'Hết giờ flash-sale' : `Flash ${flashTimeFormatted}`}
          </Typography>
        </View>
      </View>

      {/* (B) Ô tìm kiếm (Placeholder có MSSV) */}
      <View style={styles.searchSection}>
        <ShopInput
          placeholder={`Tìm món, nước, đồ dùng — ${STUDENT.mssv}`}
          placeholderTextColor={colors.textLight}
          value={keyword}
          onChangeText={setKeyword}
          style={{ color: colors.text }}
          containerStyle={{ marginBottom: 0 }}
        />
      </View>

      {/* (C) Banner quảng cáo (Picsum theo BANNER_IMAGE_ID) */}
      <View style={styles.bannerContainer}>
        <ImageBackground
          source={{ uri: `https://picsum.photos/id/${BANNER_IMAGE_ID}/800/320` }}
          style={styles.bannerImage}
          imageStyle={{ borderRadius: SIZES.radius }}
          resizeMode="cover"
          onError={() => console.log('Không tải được banner Picsum')}
        >
          <View style={styles.bannerOverlay}>
            <Typography variant="h2" color="#FFFFFF" style={styles.bannerTitle}>
              Đặt nhanh · Nhận tại quầy
            </Typography>
            <Typography variant="small" color="#E6FFFA" style={styles.bannerSubtitle}>
              Cửa hàng tiện lợi ký túc xá 24/7
            </Typography>
          </View>
        </ImageBackground>
      </View>

      {/* (D) 4 Chip danh mục */}
      <View style={styles.chipRow}>
        {chips.map((chip) => {
          const isSelected = selectedCategory === chip.id;
          return (
            <Pressable
              key={chip.id}
              onPress={() => setSelectedCategory(chip.id)}
              style={[
                styles.chip,
                isSelected
                  ? { backgroundColor: colors.primary, borderColor: colors.primary }
                  : { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <Typography
                variant="body2"
                color={isSelected ? '#FFFFFF' : colors.text}
                style={isSelected ? { fontWeight: '700' } : {}}
              >
                {chip.label}
              </Typography>
            </Pressable>
          );
        })}
      </View>

      {/* (E) 3 Cảnh mạng & FlatList */}
      <View style={styles.listContainer}>
        {loading && (
          <View style={styles.centerState}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Typography variant="body1" color={colors.textLight} style={{ marginTop: 12 }}>
              Đang tải món...
            </Typography>
          </View>
        )}

        {!loading && error && (
          <View style={styles.centerState}>
            <Typography
              variant="body1"
              color={colors.error}
              style={{ textAlign: 'center', marginBottom: 16 }}
            >
              {error}
            </Typography>
            <ShopButton title="Thử lại" onPress={load} style={{ minWidth: 120 }} />
          </View>
        )}

        {!loading && !error && (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => `${STUDENT.mssv}-${item.id}`}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Typography variant="body1" color={colors.textLight} style={{ textAlign: 'center' }}>
                  Không có món phù hợp
                </Typography>
              </View>
            }
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handlePressProduct(item)}
                style={[styles.productCard, { backgroundColor: colors.surface }]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
                <View style={styles.productInfo}>
                  <Typography variant="body1" color={colors.text} numberOfLines={2} style={styles.productTitle}>
                    {item.title}
                  </Typography>
                  <Typography variant="h3" color={colors.primary} style={styles.productPrice}>
                    {item.priceVnd.toLocaleString('vi-VN')} đ
                  </Typography>
                  <Typography variant="small" color={colors.textLight}>
                    {item.categoryLabel}
                  </Typography>
                </View>
                <ShopButton
                  title="Đặt"
                  onPress={() => handlePressProduct(item)}
                  style={styles.orderBtn}
                  disabled={isFinished}
                />
              </Pressable>
            )}
          />
        )}
      </View>

      {/* (0) Watermark ở dưới chân màn hình nếu watermarkAtTop = false */}
      {!VARIANT.watermarkAtTop && renderWatermark()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  watermarkRow: {
    paddingVertical: 6,
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E2E8F0',
  },
  watermarkText: {
    fontWeight: '600',
  },
  header: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandTitle: {
    letterSpacing: 0.5,
  },
  themeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  headerBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  flashText: {
    fontWeight: '700',
  },
  searchSection: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 10,
  },
  bannerContainer: {
    paddingHorizontal: SIZES.padding,
    marginVertical: 10,
  },
  bannerImage: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
  },
  bannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 118, 110, 0.75)',
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  bannerTitle: {
    fontWeight: '800',
    textAlign: 'center',
  },
  bannerSubtitle: {
    marginTop: 4,
    textAlign: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    marginBottom: 10,
    gap: 8,
  },
  chip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  flatListContent: {
    paddingBottom: 20,
    gap: 10,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: SIZES.radius,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  productTitle: {
    fontWeight: '600',
  },
  productPrice: {
    marginTop: 2,
    marginBottom: 2,
  },
  orderBtn: {
    minWidth: 64,
    height: 38,
    paddingHorizontal: 14,
  },
  centerState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyContainer: {
    paddingTop: 40,
    alignItems: 'center',
  },
});

export default HomeScreen;