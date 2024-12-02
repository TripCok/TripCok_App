import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import api from '../../../api/api';
import {UserContext} from '../../../context/UserContext';

const GroupApplicationsComponent = ({visible, onClose, groupId}) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false); // 새로고침 상태
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // 현재 페이지
    const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터가 있는지 여부
    const {userData} = useContext(UserContext);

    const fetchApplications = async (currentPage = 1, reset = false) => {
        if (loading || (!hasMore && !reset)) return; // 로딩 중이거나 더 가져올 데이터가 없으면 종료

        setLoading(true);
        try {
            const response = await api.get(`/application/group/${groupId}`, {
                params: {page: currentPage, size: 5},
            });

            const newApplications = response.data.content || [];
            setApplications((prev) => (reset ? newApplications : [...prev, ...newApplications]));
            setHasMore(response.data.content.length > 0); // 더 가져올 데이터가 없으면 false
        } catch (err) {
            setError('데이터를 가져오는 중 오류가 발생했습니다.');
            console.error('Error fetching applications:', err);
        } finally {
            setLoading(false);
        }
    };

    const acceptApplication = async (applicationId) => {
        try {
            await api.put(`/application`, {applicationId, groupAdminId: userData.id}); // 관리자 ID 대체
            setApplications((prev) =>
                prev.filter((application) => application.id !== applicationId)
            ); // 수락된 신청 제거
        } catch (error) {
            console.error('Error accepting application:', error);
        }
    };

    const rejectApplication = async (applicationId) => {
        try {
            await api.delete(`/application/${applicationId}?memberId=${userData.id}`);
            setApplications((prev) =>
                prev.filter((application) => application.id !== applicationId)
            );
        } catch (error) {
            console.error('Error rejecting application:', error);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            await fetchApplications(1, true); // 첫 페이지 데이터 리셋 후 새로고침
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        if (visible) {
            fetchApplications(1, true); // 첫 페이지 데이터를 리셋하고 로드
        }
    }, [visible]);

    const loadMore = () => {
        if (!loading && hasMore) {
            setPage((prev) => {
                const nextPage = prev + 1;
                fetchApplications(nextPage);
                return nextPage;
            });
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modal}>
                            <Text style={styles.title}>가입 신청 목록</Text>
                            {error && <Text style={styles.error}>{error}</Text>}
                            {loading && applications.length === 0 ? (
                                <View style={styles.centeredMessage}>
                                    <ActivityIndicator size="large" color="#6DB777" />
                                    <Text>데이터를 불러오는 중입니다...</Text>
                                </View>
                            ) : applications.length === 0 ? (
                                <View style={styles.centeredMessage}>
                                    <Text style={{color:"#888"}}>가입 신청자가 없습니다.</Text>
                                </View>
                            ) : (
                                <FlatList
                                    data={applications}
                                    renderItem={({item}) => (
                                        <View style={styles.item}>
                                            <Text style={styles.memberName}>{item.memberName}</Text>
                                            <View style={styles.actions}>
                                                <TouchableOpacity
                                                    style={[styles.actionButton, styles.acceptButton]}
                                                    onPress={() => acceptApplication(item.id)}
                                                >
                                                    <Text style={styles.buttonText}>수락</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[styles.actionButton, styles.rejectButton]}
                                                    onPress={() => rejectApplication(item.id)}
                                                >
                                                    <Text style={styles.buttonText}>거절</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                    keyExtractor={(item) => item.id.toString()}
                                    onEndReached={loadMore}
                                    onEndReachedThreshold={0.5}
                                    refreshing={refreshing}
                                    onRefresh={handleRefresh}
                                    ListFooterComponent={
                                        loading && hasMore ? (
                                            <ActivityIndicator size="large" color="#6DB777" />
                                        ) : null
                                    }
                                />
                            )}
                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                <Text style={styles.closeText}>닫기</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default GroupApplicationsComponent;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    memberName: {
        fontSize: 16,
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
    },
    actionButton: {
        padding: 10,
        borderRadius: 5,
    },
    acceptButton: {
        backgroundColor: '#6DB777',
    },
    rejectButton: {
        backgroundColor: '#FF4D4F',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: '#6DB777',
        padding: 10,
        borderRadius: 5,
    },
    closeText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 500,
    },
});
