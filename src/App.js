import React, { useState, useEffect } from 'react';
import './DeveloperPage.css';
// import developerIcon from './developer-icon.png';
import { developerData } from './developerData';

const tabData = {
    strategy: {
        title: '전략적 사고',
        color: '#4CAF50',
        keywords: [
            { kor: '미래지향', eng: 'Futuristic' },
            { kor: '수집', eng: 'Input' },
            { kor: '발상', eng: 'Ideation' },
            { kor: '전략', eng: 'Strategic' },
            { kor: '배움', eng: 'Learner' },
            { kor: '지적사고', eng: 'Intellection' },
            { kor: '분석', eng: 'Analytical' },
            { kor: '회고', eng: 'Context' }
        ]
    },
    influence: {
        title: '영향력',
        color: '#FF9800',
        keywords: [
            { kor: '사교성', eng: 'Woo' },
            { kor: '주도력', eng: 'Command' },
            { kor: '승부', eng: 'Competition' },
            { kor: '최상화', eng: 'Maximizer' },
            { kor: '자기확신', eng: 'Self-Assurance' },
            { kor: '커뮤니케이션', eng: 'Communication' },
            { kor: '존재감', eng: 'Significance' },
            { kor: '행동', eng: 'Activator' }
        ]
    },
    execution: {
        title: '실행력',
        color: '#9C27B0',
        keywords: [
            { kor: '공정성', eng: 'Restorative' },
            { kor: '심사숙고', eng: 'Deliberative' },
            { kor: '복구', eng: 'Discipline' },
            { kor: '정리', eng: 'Arranger' },
            { kor: '성취', eng: 'Achiever' },
            { kor: '집중', eng: 'Focus' },
            { kor: '신념', eng: 'Belief' },
            { kor: '책임', eng: 'Responsibility' },
            { kor: '체계', eng: 'Restorative' }
        ]
    },
    relationships: {
        title: '대인관계 구축',
        color: '#2196F3',
        keywords: [
            { kor: '개발', eng: 'Developer' },
            { kor: '연결성', eng: 'Connectedness' },
            { kor: '개별화', eng: 'Individualization' },
            { kor: '적응', eng: 'Adaptability' },
            { kor: '공감', eng: 'Empathy' },
            { kor: '절친', eng: 'Relator' },
            { kor: '긍정', eng: 'Positivity' },
            { kor: '포용', eng: 'Includer' },
            { kor: '화합', eng: 'Harmony' }
        ]
    }
};

const DeveloperPage = () => {
    const [selectedTab, setSelectedTab] = useState('relationships');
    const [selectedKeyword, setSelectedKeyword] = useState(null);

    useEffect(() => {
        const firstKeyword = tabData[selectedTab].keywords[0];
        setSelectedKeyword(firstKeyword);
    }, [selectedTab]);

    const currentData = tabData[selectedTab];
    const themeColor = currentData.color;

    const mainTitle = selectedKeyword
        ? `${selectedKeyword.kor} (${selectedKeyword.eng})`
        : '개발 (Developer)';

    const handleKeywordClick = (keyword) => {
        setSelectedKeyword(keyword);
    };

    const getRightPanelContent = () => {
        const keywordKey = selectedKeyword?.kor;
        
        // developerData에 해당 키워드가 있는지 확인
        const contentData = developerData[keywordKey];

        if (contentData) {
            return (
                <>
                    <div className="main-info-section">
                        <h3>핵심 특성</h3>
                        {contentData.coreTraits.map((text, index) => (
                            <p key={index} className="trait-item">
                                <span className="bullet-point"></span> {text}
                            </p>
                        ))}
                    </div>
                    <div className="main-info-section">
                        <h3>타인에게 미치는 영향</h3>
                        {contentData.influenceOnOthers.map((text, index) => (
                            <p key={index} className="trait-item">
                                <span className="bullet-point"></span> {text}
                            </p>
                        ))}
                    </div>
                    <div className="performance-section">
                        <h3>From Strengths to Performance</h3>
                        <ul className="performance-list">
                            {contentData.fromStrengthsToPerformance.map((item, index) => (
                                <li key={index}>
                                    {item.type === 'checkmark' && <span className="check-icon">✓</span>}
                                    {item.type === 'hyphen' && <span className="hyphen-icon">-</span>}
                                    <span dangerouslySetInnerHTML={{ __html: item.text }} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            );
        } else {
            // developerData에 없는 키워드는 기본 설명 표시
            return (
                <div className="main-info-section keyword-explanation">
                    <h3>{selectedKeyword?.kor}에 대한 설명</h3>
                    <p className="placeholder-text">이곳에 각 키워드에 대한 설명이 들어갑니다.</p>
                </div>
            );
        }
    };

    return (
        <div className="developer-page-wide" style={{ '--theme-color': themeColor }}>
            <div className="top-header" style={{ backgroundColor: themeColor }}>
                <h1 className="main-title">{mainTitle}</h1>
                <div className="header-tabs">
                    {Object.keys(tabData).map(key => (
                        <div
                            key={key}
                            className={`tab ${selectedTab === key ? 'active' : ''}`}
                            onClick={() => setSelectedTab(key)}
                        >
                            {tabData[key].title}
                        </div>
                    ))}
                </div>
            </div>
            <div className="scroll-container">
            <div className="content-area">
                <div className="left-panel">
                    <div className="strength-list">
                        {currentData.keywords.map(keyword => (
                            <span 
                                key={keyword.kor}
                                className={selectedKeyword?.kor === keyword.kor ? 'active' : ''}
                                onClick={() => handleKeywordClick(keyword)}
                            >
                                {keyword.kor}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="right-panel">
                    {getRightPanelContent()}
                </div>
            </div>
            </div>
        </div>
    );
};

export default DeveloperPage;