import React, { useState } from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar, Pagination } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoExchanges';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data;
  const itemsPerPage = 25; 

  const [currentPage, setCurrentPage] = useState(1);

  if (isFetching) return <Loader />;

  const totalExchanges = exchangesList ? exchangesList.length : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExchanges = exchangesList ? exchangesList.slice(startIndex, endIndex) : [];

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const renderExchangeHeader = (exchange) => (
    <Row align="middle" gutter={[16, 16]}>
      <Col span={6}>
        <Text strong>{exchange.trust_score_rank}.</Text>
        <Avatar className="exchange-image" src={exchange.image} />
        <Text strong>{exchange.id}</Text>
      </Col>
      <Col span={6}>{exchange.year_established || 'Not Available'}</Col>
      <Col span={6}>{millify(exchange.trade_volume_24h_btc)}</Col>
      <Col span={6}>{millify(exchange.trade_volume_24h_btc_normalized)}</Col>
      <Col span={6}>{exchange.country || 'Not Available'}</Col>
    </Row>
  );

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={6}>Exchanges and</Col>
        <Col span={6}>Year Established</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Country of origin</Col>
      </Row>

      <Row gutter={[16, 16]}>
        {currentExchanges.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={renderExchangeHeader(exchange)}
              >
                <div style={{ color: '#001529' }}>
                  {HTMLReactParser(exchange.description || `No data available for ${exchange.name}`)}
                </div>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>

      <Pagination
        current={currentPage}
        total={totalExchanges}
        pageSize={itemsPerPage}
        onChange={onPageChange}
        showSizeChanger={false}
        style={{ marginTop: '16px', textAlign: 'center' }}
      />
    </>
  );
};

export default Exchanges;
