import React from 'react'
import { DocSearch } from '@docsearch/react'

import '@docsearch/css'

import * as styles from './styles.module.css'

const SearchForm: React.FC = () => {
  return (
    <div className={styles.searchArea}>
      <DocSearch
        appId="MY83GIY4K1"
        indexName="mlemai"
        apiKey="3167487c02cc2d86a6ef55e1aaf1839a"
      />
    </div>
  )
}

export default SearchForm
